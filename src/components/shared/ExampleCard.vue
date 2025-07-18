<template lang="pug">
.container
  Card.example-card(:padding="0")
    template(#title)
      .title
        .text {{ title }}
        ProTag(v-if="pro")
    .preview
      Loading
      img(:src="getPreviewUrl(preview)")
  Card.stack.first(v-if="stack" :padding="0")
  Card.stack.second(v-if="stack" :padding="0")
</template>

<script setup lang="ts">
import { getPreview } from '../../shared/assets'
import Loading from './Loading.vue'
import ProTag from './ProTag.vue'

interface Props {
  title: string
  preview: string
  pro?: boolean
  stack?: boolean
}

defineProps<Props>()

// Make getPreview available in template
const getPreviewUrl = getPreview
</script>

<style lang="sass">
@use 'sass:math'

$offset: 0.2

@function offset($num)
  @return $num * (1 - $offset) + 100% * $offset

.example-card
  padding-bottom: 4em * $offset
  .ivu-card-head
    position: absolute
    width: 100%
    background: linear-gradient(0deg, rgb(99.608% 99.608% 99.608%) offset(0%), rgb(99.608% 99.608% 99.608% / 0.999755859375) offset(6.25%), rgb(99.609% 99.609% 99.609% / 0.998046875) offset(12.5%), rgb(99.61% 99.61% 99.61% / 0.993408203125) offset(18.75%), rgb(99.614% 99.614% 99.614% / 0.984375) offset(25%), rgb(99.62% 99.62% 99.62% / 0.969482421875) offset(31.25%), rgb(99.629% 99.629% 99.629% / 0.947265625) offset(37.5%), rgb(99.641% 99.641% 99.641% / 0.916259765625) offset(43.75%), rgb(99.657% 99.657% 99.657% / 0.875) offset(50%), rgb(99.678% 99.678% 99.678% / 0.822021484375) offset(56.25%), rgb(99.704% 99.704% 99.704% / 0.755859375) offset(62.5%), rgb(99.735% 99.735% 99.735% / 0.675048828125) offset(68.75%), rgb(99.773% 99.773% 99.773% / 0.578125) offset(75%), rgb(99.818% 99.818% 99.818% / 0.463623046875) offset(81.25%), rgb(99.871% 99.871% 99.871% / 0.330078125) offset(87.5%), rgb(99.931% 99.931% 99.931% / 0.176025390625) offset(93.75%), rgb(100% 100% 100% / 0) 100% )
    bottom: 0
    z-index: 1
</style>

<style lang="sass" scoped>
.container
  position: relative

  &:hover
    .stack
      box-shadow: 0 1px 6px rgba(0,0,0,.2)

  .example-card
    .title
      display: flex
      align-items: center
      min-height: 1.4em
      .text
        flex: 1

    .preview
      padding-bottom: 100% * 9 / 16
      width: 100%
      display: block
      img
        position: absolute
        width: 100%
        top: 0
        left: 0
        border-radius: 4px

  $stack-offset: 0.2em
  .stack
    position: absolute
    width: 100%
    height: 100%
    top: $stack-offset
    left: $stack-offset
    z-index: -1
    &.second
      top: $stack-offset * 2
      left: $stack-offset * 2
      z-index: -2
</style>
