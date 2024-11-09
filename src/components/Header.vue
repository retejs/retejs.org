<template lang="pug">
.header(ref="element")
  Menu.menu(
    mode="horizontal"
    width="100%"
  )
    MenuItem.logo(name="logo", :to="localePath('/')")
      Logo.icon.ivu-icon(:hover="true")
      span.title Rete.js
    .menu-burger(@click="drawer = true")
      Icon(name="mdi:hamburger-menu" :size="20")
    .space
    Links.links
    Search.search
    .main-items
      MenuItems
    Language
  Drawer.drawer(
    placement="left"
    v-model="drawer"
  )
    Menu(width="auto")
      MenuItems
      Links.links
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { useDrawer } from '../shared/drawer'
import Language from './Language.vue'
import Links from './Links.vue'
import Logo from './Logo.vue'
import MenuItems from './MenuItems.vue'
import Search from './Search.vue'
import Drawer from './shared/Drawer.vue'

export default defineComponent({
  setup() {
    const element = ref(null)
    const drawer = useDrawer()

    onMounted(() => {
      window.addEventListener('scroll', () => {
        if (!element.value) return

        const { bottom } = element.value.getBoundingClientRect()

        document.body.style.setProperty('--header-offset', `${bottom}px`)
      }, false)
    })
    return {
      element,
      drawer: drawer.active
    }
  },
  components: {
    Logo,
    Language,
    MenuItems,
    Search,
    Drawer,
    Links
  }
})
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.header
  align-self: stretch
  position: sticky
  top: 0
  z-index: 2
  backdrop-filter: blur(10px)
  background: rgba(255, 255, 255, 0.8)
  .menu
    display: flex
    background: none
    .menu-burger
      display: none
      & > *
        vertical-align: sub
    .space
      flex: 1
    +tablet
      .menu-burger
        display: unset
      .links
        display: none
      .main-items
        display: none

.links
  text-align: center

.logo
  font-size: 20px
  white-space: nowrap
  +phone
    padding: 0 1vw
  .icon
    height: 50px
    width: 50px
    bottom: 0.1em
    position: relative
  .title
    bottom: 0.2em
    position: relative
  & > *
    vertical-align: middle

.search
  padding: 0 14px
  width: 200px

</style>
