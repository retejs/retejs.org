<template lang="pug">
Menu.menu(width="var(--menu-width)")
  h1.title
    .text
      slot(name="title")
    .menu-burger(@click="$emit('open')")
      NuxtIcon(name="mdi:hamburger-menu" :size="20")
  .content-nav
    slot
</template>

<script setup lang="ts">
interface Props {
  open?: boolean
}

defineProps<Props>()

defineEmits<{
  open: []
}>()
</script>

<style lang="sass" scoped>
@import '@/assets/styles/vars.sass'
@import '@/assets/styles/media.sass'

.menu
  min-width: 200px
  height: calc(100vh - var(--header-offset))
  overflow: auto
  overflow-x: hidden
  position: sticky
  top: var(--header-offset)
  .menu-burger
    display: none
    margin: 0 0.1em
    & > *
      vertical-align: sub

+phone
  .menu
    --menu-width: auto
    text-align: right
    z-index: 2
    position: fixed
    right: 0
    width: auto
    height: auto
    min-width: auto
    border-radius: 0 0 0 1em
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
