<template lang="pug">
Video(
  :show="show"
  :scroll="scroll"
  :url="url"
  :title="video.title"
)
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import media from '../consts/media.json'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Video from './shared/Video.vue'

const props = defineProps({
  show: Boolean,
  scroll: Boolean,
  autoplay: Boolean
})

const video = media.youtube.intro

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const url = computed(() => `https://www.youtube.com/embed/${video.id}?${props.autoplay
  ? 'autoplay=1'
  : ''}`)

</script>
