<template lang="pug">
BaseExample
  Loading(v-if="loading")
  iframe(
    :src="isVisible || !lazy ? src : null"
    title="Rete.js v2"
    @load="loading = false"
  )
</template>

<script>
import { useIntersectionObserver, useCurrentElement, refDebounced } from '@vueuse/core';
import { computed, ref } from 'vue';
import BaseExample from '../shared/BaseExample.vue';
import Loading from '../shared/Loading.vue';

export default {
  props: {
    src: String,
    lazy: Boolean,
  },
  setup() {
    const loading = ref(true);
    const target = useCurrentElement();
    const isVisible = ref(false);
    const debouncedVisible = refDebounced(isVisible, 5000);

    useIntersectionObserver(target, ([{ isIntersecting }]) => {
      isVisible.value = isIntersecting;
      if (!isIntersecting) loading.value = true;
    });

    return {
      loading,
      target,
      isVisible: computed(() => (isVisible.value === true ? true : debouncedVisible.value)),
    };
  },
  components: {
    BaseExample,
    Loading,
  },
};
</script>

<style lang="sass" scoped>
iframe
  width: 100%
  height: 100%
  border: none
  text-align: left
</style>
