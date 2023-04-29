<template lang="pug">
ContentRenderer(:value="data")
  template(#empty)
    slot(name="not-found")
</template>

<script>
import { defineComponent } from 'vue';
import { getPreview, getAsset } from '../shared/assets';

export default defineComponent({
  props: ['path'],
  async setup(props) {
    // eslint-disable-next-line no-undef
    const { data } = await useAsyncData(props.path, () => queryContent(props.path).findOne());
    const { title, image, description } = data.value;
    const imageSrc = image ? getPreview(image.src) : getAsset('main.png');

    // should be reactive for ShareThis so useServerSeoMeta isn't an option
    // eslint-disable-next-line no-undef
    useSeoMeta({
      title,
      ogTitle: title,
      description,
      ogDescription: description,
      ogImage: imageSrc,
      twitterSite: 'rete_js',
      twitterCreator: 'rete_js',
      twitterImageSrc: imageSrc,
    });
    return {
      data,
    };
  },
});
</script>
