<template lang="pug">
.video-container(v-if="props.show")
  iframe(
    ref="introRef"
    :src="props.url"
    :title="props.title"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
  )
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  show: Boolean,
  scroll: Boolean,
  title: String,
  url: String
})

const introRef = ref<HTMLIFrameElement | null>(null)

watch(computed(() => props.scroll && props.show && introRef.value), () => {
  if (props.scroll && props.show && introRef.value) {
    const top = window.scrollY + introRef.value.getBoundingClientRect().top

    window.scrollTo({ top: top - 70, behavior: 'smooth' })
  }
})
</script>

<style lang="sass" scoped>
$size: 72vw

.video-container
  position: relative
  width: min($size, calc((100vh - var(--header-offset)) * 16 / 9))
  padding-bottom: min(#{$size / 16 * 9}, calc(100vh - var(--header-offset)))
  border-radius: 1em
  overflow: hidden
  iframe
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
</style>
