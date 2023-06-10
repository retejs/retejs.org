<template lang="pug">
.overview(:class="{ top }")
  FetchNav(v-slot="{ navigation }" :target="target")
    template(v-for="data of getList(navigation)")
      NuxtLink(v-if="!data.noPreview && !data.placeholder" :to="sanitize(data._path)")
        ExampleCard.item(
          :title="data.title"
          :preview="data.preview"
          :pro="data.pro"
        )
</template>

<script>
import ExampleCard from '../shared/ExampleCard.vue';
import { usePathSanitizer } from '../../shared/route';

export default {
  props: ['top'],
  setup(props) {
    function flat(list) {
      return list.map((item) => (item.children && item.children.length ? flat(item.children) : item)).flat();
    }
    const { sanitize } = usePathSanitizer();

    return {
      sanitize,
      getList(navigation) {
        const examples = flat(navigation.children);

        if (typeof props.top === 'undefined') return examples;

        return examples
          .filter((item) => (props.top ? item.top : !item.top))
          .sort((a, b) => (b.top || 0) - (a.top || 0));
      },
      target: 'examples',
    };
  },
  components: {
    ExampleCard,
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.overview
  display: grid
  grid-gap: 1em
  grid-template-columns: repeat(auto-fit, minmax(15em, max-content))
  .item
    max-width: 35em
    +tablet
      max-width: unset
  &.top
    grid-template-columns: repeat(auto-fit, minmax(20em, max-content))
    .item
      max-width: 30em
      +tablet
        max-width: unset

</style>
