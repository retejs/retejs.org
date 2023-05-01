<template lang="pug">
img(:src="src")
</template>

<script setup>
import { useContentPath } from '../../shared/content';
import { getPreview } from '../../shared/assets';

const contentPath = useContentPath();
const path = contentPath.value.replace('/preview/', '/examples/');
// eslint-disable-next-line no-undef
const { data } = await useAsyncData(path, () => queryContent(path).findOne());

definePageMeta({
  layout: 'preview',
});

const src = getPreview(data.value.image.src);
</script>

<style lang="sass" scoped>
img
  height: 100%
</style>
