<template lang="pug">
figure.diagram
  .scrollable
    img(:src="'/diagrams/'+name+'.svg'")
  figcaption.caption {{ caption }}
</template>

<script setup lang="ts">
interface Props {
  name: string
  caption: string
}

defineProps<Props>()
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.diagram
  display: grid
  justify-content: start
  .scrollable
    max-width: 100%
    overflow-x: auto
    +phone
      img
        max-width: unset
  .caption
    text-align: center
    font-size: 0.8em
    font-style: italic
</style>
