<template lang="pug">
ContentRenderer(:value="data")
  template(#empty)
    slot(name="not-found")
</template>

<script>
import { defineComponent, computed, ref } from 'vue';
import { getPreview, mainPreview } from '../shared/assets';
import { useShareThis } from '../shared/sharethis';

export default defineComponent({
  props: ['path', 'share'],
  async setup(props) {
    const path = props.path.replace(/\/$/, '');
    const dataRef = ref(null);
    // workaround for https://github.com/vuejs/core/issues/1409
    if (props.share) useShareThis(computed(() => dataRef.value && props.share(dataRef.value)));

    // eslint-disable-next-line no-undef
    const { data } = await useAsyncData(path, () => queryContent(path).findOne());

    const { image, description } = data.value;
    const title = `${data.value.title} - Rete.js`;
    const imageSrc = image ? getPreview(image.src) : mainPreview;

    dataRef.value = data.value;
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
