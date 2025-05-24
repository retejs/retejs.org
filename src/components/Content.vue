<template lang="pug">
IViewContent.content
  slot
</template>

<script setup lang="ts">
import { Content as IViewContent } from 'view-ui-plus-es'
</script>

<style lang="sass" scoped>
.content
  flex: 1
  max-width: auto
  align-self: center
  text-align: center
  width: 100%
</style>
