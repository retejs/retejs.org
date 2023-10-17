<template lang="pug">
figure.diagram
  img(:src="'/diagrams/'+name+'.svg'")
  figcaption.caption {{ caption }}
</template>

<script>
export default {
  props: ['name', 'caption']
}
</script>

<style lang="sass" scoped>
.diagram
  display: grid
  justify-content: start
  .caption
    text-align: center
    font-size: 0.8em
    font-style: italic
</style>

