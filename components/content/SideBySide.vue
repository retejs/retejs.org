<template lang="pug">
.side-by-side
  .left
    slot(name="left")
  .right
    slot(name="right")
</template>

<script>
export default {
  props: ['left', 'right'],
};
</script>

<style lang="sass" scoped>
.side-by-side
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 1em
  .left, .right
    overflow-x: auto

</style>
