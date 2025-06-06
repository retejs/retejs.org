<template lang="pug">
IViewFooter.footer
  .lines
    div Released under the
      | !{' '}
      a(:href="license.link", target="_blank") {{license.name}}
    div Copyright © {{releaseYear}}-{{year}} {{author}}
</template>

<script setup lang="ts">
import { Footer as IViewFooter } from 'view-ui-plus-es'
import { author, license, release as releaseYear } from '@/consts/product.json'

const year = new Date().getFullYear()
</script>

<style lang="sass" scoped>
.footer
  align-self: stretch
  border-top: 1px solid #dcdee2
  text-align: center
  .lines > *
    margin: 0.4em 0
</style>
