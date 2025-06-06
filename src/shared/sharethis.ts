import { useHead } from '#imports'
import { computed, type ComputedRef, inject, onMounted, onUnmounted, provide, reactive, type Ref, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import host from '../consts/host.json'

declare let process: NodeJS.Process & { client: boolean }

type Context = {
  consumers: number
  title: string | null
  visible: boolean
  data: Record<string, string | null>
}

export const key = Symbol('sharethis-di-key')

export function provideShareThis(): undefined | Context {
  if (!process.client) return undefined

  useHead({
    script: [
      {
        src: 'https://platform-api.sharethis.com/js/sharethis.js#property=644c11c3ac242f001bf9c4da',
        async: true
      }
    ]
  })
  const route = useRoute()
  const router = useRouter()

  const consumers = ref(0)
  const title = ref(null)

  const data: Context = reactive({
    consumers,
    title,
    visible: computed(() => consumers.value > 0),
    data: {
      'data-title': title,
      'data-url': computed(() => `${host.url}${router.resolve(route).href}`)
    }
  })

  provide(key, data)

  return data
}

export function useShareThis(title: string | null | Ref<string | null> | ComputedRef<string | null>): void {
  if (!process.client) return
  const sharethis: Context | undefined = inject(key)

  if (!sharethis) throw new Error('cannot inject sharethis')

  onMounted(() => {
    sharethis.title = title ? (typeof title === 'string'
      ? title
      : title.value) : ''
    sharethis.consumers++
  })
  onUnmounted(() => {
    sharethis.consumers--
  })
}
