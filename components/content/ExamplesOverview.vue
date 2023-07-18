<template lang="pug">
.overview(:class="{ top }")
  FetchNav(v-slot="{ navigation }" :target="target")
    template(v-for="data of getList(navigation)")
      NuxtLink(:to="sanitize(data._path)")
        ExampleCard.item(
          :title="data.title"
          :preview="data.preview"
          :stack="isGroup(data) && data.preview"
          :pro="data.pro"
        )
</template>

<script>
/* eslint-disable no-underscore-dangle */
import ExampleCard from '../shared/ExampleCard.vue';
import { usePathSanitizer } from '../../shared/route';
import { flat } from '../../shared/navigation';

export default {
  props: ['top', 'filter'],
  setup(props) {
    const { sanitize } = usePathSanitizer();

    function extractGroups(examples) {
      return examples
        .filter((item) => item.overviewGroup)
        .filter((item) => (props.filter ? props.filter !== sanitize(item._path) : true));
    }
    function isGroup(item) {
      return item.overviewGroup;
    }
    function isInsideGroup(item, group) {
      return item._path !== group._path && item._path.startsWith(group._path);
    }
    function isInsideGroups(item, groups) {
      return groups.some((g) => isInsideGroup(item, g));
    }

    return {
      sanitize,
      isGroup,
      getList(navigation) {
        const examples = flat(navigation.children);
        const groups = extractGroups(examples);

        const list = examples
          .filter((item) => !props.filter || sanitize(item._path).startsWith(props.filter))
          .filter((item) => isGroup(item) || (!item.noPreview && !item.placeholder))
          .filter((item) => !isInsideGroups(item, groups))
          .filter((item) => !isGroup(item) || groups.includes(item))
          .map((item) => {
            if (!isGroup(item)) return item;
            const groupExamples = examples.filter((example) => isInsideGroup(example, item));

            return {
              ...item,
              preview: groupExamples[0]?.preview,
            };
          })
          .filter((item) => (props.top ? item.top : !item.top))
          .sort((a, b) => (b.top || 0) - (a.top || 0));

        return list;
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
  grid-template-columns: repeat(auto-fit, minmax(15em, 1fr))
  margin-bottom: 2em
  .item
    max-width: 35em
    +tablet
      max-width: unset
  &.top
    grid-template-columns: repeat(auto-fit, minmax(20em, 1fr))
    .item
      max-width: 30em
      +tablet
        max-width: unset

</style>
