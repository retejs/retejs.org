<template lang="pug">
.footer
  .lines
    div Released under the
      | !{' '}
      Link(:href="license.link", target="_blank") {{license.name}}
    div Copyright © {{releaseYear}}-{{year}} {{author}}
</template>

<script setup lang="ts">
import Link from './Link.vue'
import { author, license, release as releaseYear } from '@/consts/product.json'

const year = new Date().getFullYear()
</script>

<style lang="sass" scoped>
.footer
  align-self: stretch
  border-top: 1px solid #dcdee2
  text-align: center
  background: #f5f7f9
  color: #515a6e
  font-size: 14px
  padding: 24px 50px
  flex: 0 0 auto
  .lines > *
    margin: 0.4em 0
</style>
