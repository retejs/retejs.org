<template lang="pug">
slot(:navigation="targetContent")
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAsyncData, queryCollectionNavigation } from '#imports'
import { useI18n } from 'vue-i18n'

interface Props {
  target: string
}

const i18n = useI18n()
const props = defineProps<Props>()

const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content' as never)
})

const localeContent = computed(() =>
  navigation.value?.find((n: any) => n.path === `/${i18n.locale.value}`)
)

const targetContent = computed(() =>
  localeContent.value?.children?.find((n: any) =>
    n.path === `/${i18n.locale.value}/${props.target}`
  )
)
</script>
