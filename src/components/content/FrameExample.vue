<template lang="pug">
BaseExample
  Loading(v-if="loading")
  iframe(
    :src="iframeSrc"
    title="Rete.js v2"
    @load="loading = iframeSrc === null ? true : false"
  )
</template>

<script lang="ts">
import { refDebounced, useCurrentElement, useIntersectionObserver } from '@vueuse/core'
import { computed, ref } from 'vue'

import BaseExample from '../shared/BaseExample.vue'
import Loading from '../shared/Loading.vue'

export default {
  props: {
    src: String,
    lazy: Boolean
  },
  setup(props) {
    const loading = ref(true)
    const target = useCurrentElement()
    const isVisible = ref(false)
    const debouncedVisible = refDebounced(isVisible, 5000)

    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      isVisible.value = isIntersecting
      if (!isIntersecting) loading.value = true
    })

    return {
      loading,
      target,
      iframeSrc: computed(() => isVisible.value || !props.lazy
        ? props.src
        : null),
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-boolean-literal-compare
      isVisible: computed(() => isVisible.value === true
        ? true
        : debouncedVisible.value)
    }
  },
  components: {
    BaseExample,
    Loading
  }
}
</script>

<style lang="sass" scoped>
iframe
  width: 100%
  height: 100%
  border: none
  text-align: left
</style>
