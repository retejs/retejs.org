import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useDrawer() {
  const router = useRouter()
  const active = ref(false)

  router.beforeEach(() => {
    active.value = false
  })

  return {
    active,
    setActive: (value: boolean) => {
      active.value = value
    }
  }
}
