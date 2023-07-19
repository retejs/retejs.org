<template lang="pug">
.api-overview(:class="{ top }")
  FetchNav(v-slot="{ navigation }" target="docs")
    Card.item(v-for="data of getList(navigation)", :key="data._path")
      template(#title)
        NuxtLink(:to="sanitize(data._path)") {{ data.title }}
        Tooltip(content="Open on npm", placement="right")
          NuxtLink(:to="'https://www.npmjs.com/package/' + data.title", target="_blank", @click.stop="")
            font-awesome-icon.icon(:icon="['fa-brands', 'npm']")
</template>

<script>
/* eslint-disable no-underscore-dangle */
import ExampleCard from '../shared/ExampleCard.vue';
import { usePathSanitizer } from '../../shared/route';

export default {
  props: ['filter'],
  setup(props) {
    const { sanitize } = usePathSanitizer();
    const filter = props.filter ? props.filter.split(',') : null;

    return {
      sanitize,
      getList(navigation) {
        const api = navigation.children.find((n) => n._path.endsWith('/docs/api'));

        if (!api) return [];

        const list = api.children
          .filter((child) => !child.placeholder && !child.overview)
          .filter((child) => !filter || filter.includes(child.title));

        return list;
      },
    };
  },
  components: {
    ExampleCard,
  },
};
</script>

<style lang="sass">
.api-overview
  .ivu-card-head
    white-space: nowrap
    display: flex
    align-items: center
    & > *
      text-overflow: ellipsis
      overflow: hidden
  .ivu-card-body
    display: none
</style>
<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.api-overview
  display: grid
  margin-bottom: 2em
  grid-template-columns: repeat(auto-fill, minmax(15em, 1fr))
  grid-gap: 1em
  .item

    .icon
      vertical-align: middle
      width: 2em
      height: 2em
      margin: 0 0.5em
      color: #c20000

</style>
