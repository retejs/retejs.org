<template lang="pug">
ContentRenderer(v-if="data" :value="data")
slot(v-else name="not-found")
</template>

<script setup lang="ts">
// workaround for https://github.com/nuxt/nuxt/issues/23074
import { computed, ref } from 'vue'

import host from '../consts/host.json'
import { getPreview, mainPreview } from '../shared/assets'
import { useShareThis } from '../shared/sharethis'

const props = defineProps({
  path: String,
  share: Function,
  title: Function,
  largePreview: Boolean
})

const path = props.path.replace(/\/$/, '')
const dataRef = ref(null)
// workaround for https://github.com/vuejs/core/issues/1409

if (props.share) useShareThis(computed(() => dataRef.value && props.share(dataRef.value)))

const { data } = await useAsyncData(path, () => queryCollection('content').path(path).first())

if (data.value) {
  const { image, description, keywords } = data.value
  const title = computed(() => `${props.title
    ? props.title(data.value) || data.value.title
    : data.value.title} - Rete.js`)
  const imageSrc = image
    ? getPreview(image.src)
    : mainPreview

  const twitterCard = props.largePreview
    ? imageSrc.endsWith('.gif')
      ? 'player'
      : 'summary_large_image'
    : 'summary'

  dataRef.value = data.value
  // should be reactive for ShareThis so useServerSeoMeta isn't an option

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    keywords: [keywords, 'rete.js'].filter(Boolean).join(','),
    ogDescription: description,
    ogImage: imageSrc,
    twitterCard,
    twitterTitle: title,
    twitterDescription: description,
    twitterSite: 'rete_js',
    twitterCreator: 'rete_js',
    twitterPlayerWidth: 500,
    twitterPlayerHeight: Math.ceil(500 / (16 / 9)),
    twitterPlayer: `${host.url}/preview/${path.split('/').filter(Boolean)
      .reverse()[0]}`,
    twitterImage: imageSrc,
    twitterImageSrc: imageSrc
  })
}
</script>
