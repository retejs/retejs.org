<template lang="pug">
.overview
  FetchNav(v-slot="{ navigation }" :target="target")
    template(v-for="data of getList(navigation)")
      NuxtLink(v-if="!data.noPreview && !data.placeholder" :to="sanitize(data._path)")
        Card.item(:padding="0")
          template(#title)
            .title
              .text {{ data.title }}
              Tag.tag(v-if="data.pro" color="blue" size="6px") Pro
          img.preview(:src="previewPath(data.preview)")
</template>

<script>
import { usePathSanitizer } from '../../shared/route';

export default {
  setup() {
    function flat(list) {
      return list.map((item) => (item.children && item.children.length ? flat(item.children) : item)).flat();
    }
    const { sanitize } = usePathSanitizer();

    return {
      sanitize,
      getList(navigation) {
        return flat(navigation.children);
      },
      target: 'examples',
    };
  },
  methods: {
    previewPath(path) {
      return `https://raw.githubusercontent.com/retejs/retejs.org/assets/preview/${path}`;
    },
  },
};
</script>

<style lang="sass" scoped>
.overview
  display: grid
  grid-gap: 1em
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr))
  .title
    display: flex
    align-items: center
    min-height: 1.4em
    .text
      flex: 1
    .tag
      height: 1.4em
      line-height: 1.3em
      padding: 0 0.3em
      margin-left: 1em
  .preview
    width: 100%
    display: block
</style>
