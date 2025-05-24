<template lang="pug">
BaseExample
  Loading(v-if="loading")
  iframe(
    :src="iframeSrc"
    title="Rete.js v2"
    @load="loading = iframeSrc === null ? true : false"
  )
</template>

<script setup lang="ts">
import { refDebounced, useCurrentElement, useIntersectionObserver } from '@vueuse/core'
import { computed, ref } from 'vue'

import BaseExample from '../shared/BaseExample.vue'
import Loading from '../shared/Loading.vue'
interface Props {
  src: string
  lazy?: boolean
}

const props = defineProps<Props>()

const loading = ref(true)
const target = useCurrentElement()
const isVisible = ref(false)
const debouncedVisible = refDebounced(isVisible, 5000)

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  isVisible.value = isIntersecting
  if (!isIntersecting) loading.value = true
})

const iframeSrc = computed(() => isVisible.value || !props.lazy
  ? props.src
  : '')
</script>

<style lang="sass" scoped>
iframe
  width: 100%
  height: 100%
  border: none
  text-align: left
</style>
