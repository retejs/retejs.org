<template lang="pug">
ContentRenderer(:value="data")
  template(#empty)
    slot(name="not-found")
</template>


<script setup>
// workaround for https://github.com/nuxt/nuxt/issues/23074
import { computed, ref } from 'vue';
import { getPreview, mainPreview } from '../shared/assets';
import { useShareThis } from '../shared/sharethis';
import host from '../consts/host.json';

const props = defineProps({
  path: String,
  share: Function,
  title: Function,
  largePreview: Boolean
});

const path = props.path.replace(/\/$/, '');
const dataRef = ref(null);
// workaround for https://github.com/vuejs/core/issues/1409
if (props.share) useShareThis(computed(() => dataRef.value && props.share(dataRef.value)));

// eslint-disable-next-line no-undef
const { data } = await useAsyncData(path, () => queryContent(path).findOne());

if (data.value) {
  const { image, description, keywords } = data.value;
  const title = computed(() => `${props.title ? props.title(data.value) || data.value.title : data.value.title} - Rete.js`);
  const imageSrc = image ? getPreview(image.src) : mainPreview;
  // eslint-disable-next-line no-nested-ternary
  const twitterCard = props.largePreview
    ? (imageSrc.endsWith('.gif') ? 'player' : 'summary_large_image')
    : 'summary';

  dataRef.value = data.value;
  // should be reactive for ShareThis so useServerSeoMeta isn't an option
  // eslint-disable-next-line no-undef
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
    twitterPlayer: `${host.url}/preview/${path.split('/').filter(Boolean).reverse()[0]}`,
    twitterImage: imageSrc,
    twitterImageSrc: imageSrc,
  });
}
</script>
