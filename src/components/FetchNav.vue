<template lang="pug">
slot(:navigation="targetContent")
</template>

<script setup lang="ts">
import { computed } from 'vue'

const i18n = useI18n()
const props = defineProps({
  target: {
    type: String,
    required: true
  }
})

const { data: navigation } = await useAsyncData('navigation', () => {
  return queryCollectionNavigation('content')
})

const localeContent = computed(() => navigation.value.find(n => n.path === `/${i18n.locale.value}`))
const targetContent = computed(() => localeContent.value.children.find(n => n.path === `/${i18n.locale.value}/${props.target}`))
</script>
