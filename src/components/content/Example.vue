<template lang="pug">
BaseExample
  iframe(
    :src="src"
    title="Rete.js v2"
    allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
    sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
  )
</template>

<script setup lang="ts">
import { computed } from 'vue'

import qs from 'qs'
import BaseExample from '../shared/BaseExample.vue'

interface Props {
  id?: string
  module?: string
}

const props = defineProps<Props>()

const params = {
  autoresize: 1,
  hidedevtools: 1,
  fontsize: 11,
  hidenavigation: 1,
  module: props.module,
  theme: 'light',
  view: process.client && window.innerWidth <= 768
    ? 'preview'
    : 'split',
  verticallayout: 1
}

const src = computed(() => `https://codesandbox.io/embed/${props.id}?${qs.stringify(params)}`)
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

iframe
  width: 100%
  height: 100%
  border: 2px solid #f3f3f3
  border-radius: 0.7em
  text-align: left
  +phone
    width: 100%
    height: 80vh

</style>
