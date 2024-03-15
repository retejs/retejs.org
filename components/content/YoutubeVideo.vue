<template lang="pug">
SharedVideo.video(
  :show="true"
  :scroll="false"
  :title="title"
  :url="url"
)
</template>

<script lang="ts" setup>
import SharedVideo from '../shared/Video.vue';
import media from '../../consts/media.json';

const props = defineProps({
  name: {
    type: String as () => keyof typeof media.youtube,
    required: true,
  },
});

const video = media.youtube[props.name];
const { title } = video;
const url = `https://www.youtube.com/embed/${video.id}?autoplay=0`;
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

+tablet
  .video
    width: 100%
    padding-bottom: calc(100% / 16 * 9)
</style>
