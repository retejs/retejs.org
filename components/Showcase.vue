<template lang="pug">
.showcase
  FetchNav(v-slot="{ navigation }" target="examples")
    .item(v-for="item in getList(navigation)" :key="item._path" )
      .info
        h2.title {{ item.showcase.title }}
        .description {{ item.showcase.description }}
        .links
          Button(:to="localePath('/examples')" icon="ios-code" shape="circle" type="primary") {{$t('examples')}}
          Button(:to="localePath('/docs/')" icon="ios-book" shape="circle" type="primary") {{$t('docs')}}
      Card.preview(:padding="0")
        .open
          Tooltip(:content="$t('openNewTab')" placement="top-end")
            Button(:to="item.showcase.source" icon="ios-link" target="_blank")
        client-only
          FrameExample(:src="item.showcase.source")
          template(#placeholder)
            NuxtLink(:to="item._path")
              img(:src="getPreview(item.preview)")

</template>

<script>
import { flat } from '../shared/navigation';
import { getPreview } from '../shared/assets';

export default {
  methods: {
    getPreview,
    getList(navigation) {
      const examples = flat(navigation.children);

      return examples
        .filter((item) => item.showcase)
        .sort((a, b) => a.showcase.order - b.showcase.order);
    },
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.showcase
  max-width: 80em
  margin: auto

.item
  display: flex
  gap: 2em
  margin: 4em
  justify-content: center
  +tablet
    margin: 2em
    gap: 1em
  +phone
    margin: 1em
    gap: 0.5em
    flex-direction: column

  .info
    width: 20%
    text-align: right
    .title
      margin-top: 0.5em
    .description
      color: rgba(50, 50, 50, 0.6)
    +tablet
      width: 30%
    +phone
      text-align: left
      width: 100%
    .links
      display: flex
      gap: 1em
      flex-direction: column
      margin: 1em 0
      align-items: flex-end
      +phone
        flex-direction: row
        justify-content: center

  .preview
    width: 80%
    border-radius: 1em
    overflow: hidden
    +tablet
      width: 70%
    +phone
      width: 100%
    .open
      position: absolute
      bottom: 0
      right: 0
      a
        border-radius: 1.8em 0 0 0
        border-bottom: 0
        border-right: 0
    img
      display: block
      width: 100%
</style>

<style lang="sass">
.showcase
  .preview
    .ivu-card-head
      display: none
</style>
