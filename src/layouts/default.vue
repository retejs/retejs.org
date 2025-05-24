<template lang="pug">
.app
  VitePwaManifest
  Header
  ShareThis
    Content
      slot
  Footer
</template>

<script setup lang="ts">
import Content from '../components/Content.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
import ShareThis from '../components/ShareThis.vue'
import { seoLang } from '../shared/seoLang'

seoLang()
</script>

<style lang="sass" scoped>
  .app
    display: flex
    min-height: 100vh
    align-items: center
    flex-direction: column
    font-family: Ubuntu
    font-size: 1rem
  </style>

<style lang="sass">
@import '@/assets/styles/common.sass'
</style>
