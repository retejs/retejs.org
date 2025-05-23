
<template lang="pug">
img(:src="src")
</template>

<script setup lang="ts">
import { getPreview, mainPreview } from '../../shared/assets'
import { useContentPath } from '../../shared/content'

const contentPath = useContentPath()
const path = contentPath.value.replace('/preview/', '/examples/')

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { data } = await useAsyncData(path, () => queryCollection('content').path(path).first())
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
definePageMeta({
  layout: 'preview'
})

const image = data.value?.image?.src
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const src = image
  ? getPreview(image)
  : mainPreview

</script>

<style lang="sass" scoped>
img
  height: 100%
</style>
