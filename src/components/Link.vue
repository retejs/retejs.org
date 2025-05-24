<template lang="pug">
NuxtLink(
  :to="href"
  :target="target"
  :rel="rel"
)
  slot
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  href: string
  target?: string
  rel?: string
}>();

</script>

<style lang="sass" scoped>
a
  background: 0 0
  color: #2d8cf0
  cursor: pointer
  outline: 0
  text-decoration: none
  transition: color 0.2s ease
</style>