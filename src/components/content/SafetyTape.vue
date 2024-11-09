<template lang="pug">
.safety-tape
  span {{ text }}
</template>

<script lang="ts">
export default {
  name: 'SafetyTape',
  props: {
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
$ribbon-size: 25px
$color1: black
$color2: #ffe700

.safety-tape
  display: flex
  justify-content: center
  align-items: center
  padding: 8px
  color: white
  font-weight: bold
  text-transform: uppercase
  position: relative
  background-image: repeating-linear-gradient(-55deg, $color2, $color2 $ribbon-size, $color1 $ribbon-size + 1px, $color1 $ribbon-size * 2, $color2 $ribbon-size * 2 + 1px)
  border: 1px solid #d8d8d8
  box-shadow: 0px 0px 15px #00000033

span
  color: $color1
  background: $color2
  padding: 0 1em
</style>
