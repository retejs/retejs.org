<template lang="pug">
Video(
  :show="show"
  :scroll="scroll"
  :url="url"
  :title="video.title"
)
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import Video from './shared/Video.vue';
import media from '../consts/media.json';

const props = defineProps({
  show: Boolean,
  scroll: Boolean,
  autoplay: Boolean,
});

const video = media.youtube.intro;

const url = computed(() => `https://www.youtube.com/embed/${video.id}?${props.autoplay ? 'autoplay=1' : ''}`);
</script>
