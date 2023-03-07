<template lang="pug">
client-only
  iframe(
    :src="src"
    title="Rete.js v2"
  )
</template>

<script>
export default {
  props: {
    src: String,
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

iframe
  width: 80vw
  height: 30vw
  border: none
  text-align: left
  border: 2px solid #f3f3f3
  border-radius: 0.7em
  +phone
    width: 100%
    height: 80vh

</style>
