<template lang="pug">
.container
  client-only
    template(#placeholder)
      Loading
    slot
</template>

<script setup lang="ts">
import Loading from './Loading.vue'

interface Props {
  src?: string
}

defineProps<Props>()
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.container
  width: 80vw
  height: 30vw
  max-width: 100%
  border: 2px solid #f3f3f3
  border-radius: 0.7em
  +phone
    width: 100%
    height: 80vh

</style>
