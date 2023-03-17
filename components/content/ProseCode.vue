<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    code: {
      type: String,
      default: '',
    },
    language: {
      type: String,
      default: null,
    },
    filename: {
      type: String,
      default: null,
    },
    highlights: {
      type: Array as () => number[],
      default: () => [],
    },
    meta: {
      type: String,
      default: null,
    },
  },
});
</script>

<style lang="sass">
@import '@/assets/styles/vars.sass'

code
  padding: 0.1em 0.5em
  margin: 0.5em 0
  border-radius: 1em
  background: $code-background
  font-size: 0.9em
  color: $code-foreround
  overflow: auto
pre code
  display: block
  padding: 1em
  .line
    display: block
    min-height: 1rem
    width: fit-content
</style>
