<template lang="pug">
client-only
  .sharethis(:class="{ visible: sharethis.visible }")
    .sharethis-sticky-share-buttons(v-bind="sharethis.data")
slot
</template>

<script lang="ts" setup>
import { provideShareThis } from '../shared/sharethis';

const sharethis = provideShareThis();
</script>

<style lang="sass" scoped>
.sharethis
  display: none
  &.visible
    display: initial
</style>
