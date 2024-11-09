<template lang="pug">
SharedVideo.video(
  :show="true"
  :scroll="false"
  :title="title"
  :url="url"
)
</template>

<script lang="ts" setup>
import media from '../../consts/media.json'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SharedVideo from '../shared/Video.vue'

const props = defineProps({
  name: {
    type: String as () => keyof typeof media.youtube,
    required: true
  }
})

const video = media.youtube[props.name]
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { title } = video
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const url = `https://www.youtube.com/embed/${video.id}?autoplay=0`

</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

+tablet
  .video
    width: 100%
    padding-bottom: calc(100% / 16 * 9)
</style>
