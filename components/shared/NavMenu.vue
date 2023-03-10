<template lang="pug">
Menu.menu(width="auto")
  h1.title
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
@import '@/assets/styles/media.sass'
$offset: 60px

.menu
  min-width: 200px
  height: calc(100vh - $offset)
  overflow: auto
  .menu-burger
    display: none
    margin: 0 0.1em

+phone
  .menu
    text-align: right
    width: 100%
    z-index: 1
    position: absolute
    right: 0
    height: auto
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
  +phone
    padding: 0.5em
</style>
