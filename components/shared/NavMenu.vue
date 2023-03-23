<template lang="pug">
Menu.menu(width="auto")
  h1.title
    .text
      slot(name="title")
    .menu-burger(@click="$emit('open')")
      Icon(type="md-menu" :size="20")
  .content-nav
    slot
</template>

<script>
export default {
  props: ['open'],
};

</script>

<style lang="sass" scoped>
@import '@/assets/styles/vars.sass'
@import '@/assets/styles/media.sass'

.menu
  min-width: 200px
  height: calc(100vh - $top-offset)
  overflow: auto
  position: sticky
  top: $top-offset
  .menu-burger
    display: none
    margin: 0 0.1em

+phone
  .menu
    text-align: right
    z-index: 1
    position: absolute
    right: 0
    width: auto
    height: auto
    min-width: auto
    .menu-burger
      display: unset
    .content-nav
      display: none

.title
  margin: 0
  padding: 1em
  position: sticky
  top: 0
  background: linear-gradient(180deg, white 0%, white 70%, transparent)
  z-index: 2
  .text
    display: inline
  +phone
    padding: 0.5em
    .text
      display: none
</style>
