<template lang="pug">
.links
  a.link(v-for="{title, icon, to} of links" :href="to" target="_blank")
    Tooltip(:content="title", :key="to")
      NuxtIcon.icon(:name="icon")

</template>

<script setup lang="ts">
import { social } from '@/consts/product.json'

const links = social
</script>

<style lang="sass" scoped>
.links
  .link
    color: #7f7f7f
    margin: 0 0.26em
    font-size: 1.55em
    &:hover
      color: #cccccc
    .icon
      vertical-align: text-top
      margin-top: 0.1em
      width: 1.2em
</style>
