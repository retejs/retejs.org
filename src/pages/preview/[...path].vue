
<template lang="pug">
img(:src="src")
</template>

<script setup lang="ts">
import { useAsyncData, queryCollection, definePageMeta } from '#imports'
import { getPreview, mainPreview } from '../../shared/assets'
import { useContentPath } from '../../shared/content'

const contentPath = useContentPath()
const path = contentPath.value.replace('/preview/', '/examples/')

const { data } = await useAsyncData(path, () => queryCollection('content' as never).path(path).first())

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
