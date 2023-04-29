<template lang="pug">
.overview
  FetchNav(v-slot="{ navigation }" :target="target")
    template(v-for="data of getList(navigation)")
      NuxtLink(v-if="!data.noPreview && !data.placeholder" :to="sanitize(data._path)")
        Card.item(:padding="0")
          template(#title)
            .title
              .text {{ data.title }}
              ProTag(v-if="data.pro")
          img.preview(:src="getPreview(data.preview)")
</template>

<script>
import ProTag from '../shared/ProTag.vue';
import { usePathSanitizer } from '../../shared/route';
import { getPreview } from '../../shared/assets';

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
    getPreview,
  },
  components: {
    ProTag,
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
  .preview
    width: 100%
    display: block
</style>
