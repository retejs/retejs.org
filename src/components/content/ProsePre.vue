<template lang="pug">
pre.block
  .lang {{ language }}
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    language: {
      type: String,
      default: null
    }
  }
})
</script>

<style lang="sass" scoped>
@import '@/assets/styles/vars.sass'

.block
  position: relative
  .lang
    position: absolute
    top: 0
    right: 0
    text-transform: uppercase
    color: #8f8f8f
    padding: 0.4em 0.8em
    font-size: 0.65em

pre
  padding: 1em
  margin: 0.5em 0
  border-radius: 1em
  background: $code-background
  font-size: 0.9em
  color: $code-foreround
  overflow: auto
.block > pre
  background: transparent
pre code
  display: block
  padding: 1em
  .line
    display: block
    min-height: 1rem
    width: fit-content
</style>
