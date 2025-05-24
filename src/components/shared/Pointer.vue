<template>
  <div class="root" :style="rootStyles">
    <svg :width="size * length" :height="size" :style="svgStyles" xmlns="http://www.w3.org/2000/svg">
      <g id="Layer_1">
        <title>Layer 1</title>
        <ellipse filter="url(#blur)" :ry="r" :rx="r" :cy="cy" :cx="cx" fill="#fff" />
        <path filter="url(#blur)" :d="path" fill="#fff" />
        <ellipse :ry="r" :rx="r" :cy="cy" :cx="cx" fill="#6a6a6a" />
        <path :d="path" fill="#6a6a6a" />
      </g>
      <defs>
        <filter height="200%" width="200%" y="-50%" x="-50%" id="blur">
          <feGaussianBlur :stdDeviation="size * 0.2" in="SourceGraphic" />
        </filter>
      </defs>
    </svg>
    <div class="title" :style="titleStyles">{{title}}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  length: number
  size: number
  x: number
  y: number
  rotate: number
  title: string
  scale: number
}

const props = defineProps<Props>()

const cx = computed(() => props.size / 2)
const cy = computed(() => props.size / 2)
const r = computed(() => props.size * 0.4)
const offset = computed(() => props.size * 0.3)

const path = computed(() =>
  `M ${cx.value} ${offset.value} L ${cx.value} ${props.size - offset.value} L ${props.length * props.size} ${cy.value} Z`
)

const rootStyles = computed(() => ({
  left: `${props.x - cx.value * props.scale}px`,
  top: `${props.y - cy.value * props.scale}px`,
  transform: `scale(${props.scale})`
}))

const svgStyles = computed(() => ({
  transformOrigin: `${cx.value}px ${cy.value}px`,
  transform: `rotate(${props.rotate}deg)`
}))

const titleStyles = computed(() => {
  const rotatePointAroundEllipse = (point: [number, number], angle: number) => {
    const [x1, y1] = point
    const theta = angle * Math.PI / 180
    const cos = Math.cos(theta)
    const sin = Math.sin(theta)
    const x2 = x1 * cos - y1 * sin
    const y2 = x1 * sin + y1 * cos

    return [x2, y2]
  }

  const x0 = props.length * props.size + 5
  const y0 = 0
  const [x1, y1] = rotatePointAroundEllipse([x0, y0], props.rotate)
  const r = (props.rotate + 360) % 360
  const offsetValue = r > 180
    ? (360 - r) / 180
    : r / 180

  return {
    left: `${x1}px`,
    top: `${y1}px`,
    transform: `translate(${-offsetValue * 100}%, 0%)`
  }
})
</script>

<style lang="sass" scoped>
.root
  position: absolute
  svg
    position: absolute
  .title
    position: absolute
    white-space: nowrap
    font-size: 22px
    color: #727272
</style>
