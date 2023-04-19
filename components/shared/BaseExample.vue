<template lang="pug">
.container
  client-only
    template(#placeholder)
      .warn
        Spin(size="large")
    slot
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

.container
  width: 80vw
  height: 30vw
  max-width: 100%
  border: 2px solid #f3f3f3
  border-radius: 0.7em
  +phone
    width: 100%
    height: 80vh
  .warn
    display: flex
    width: 100%
    height: 100%
    justify-content: center
    align-items: center

</style>
