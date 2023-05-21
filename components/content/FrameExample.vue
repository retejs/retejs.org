<template lang="pug">
BaseExample
  iframe(
    :src="src"
    title="Rete.js v2"
  )
</template>

<script>
import BaseExample from '../shared/BaseExample.vue';

export default {
  props: {
    src: String,
  },
  components: {
    BaseExample,
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
