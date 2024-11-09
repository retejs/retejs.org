<template lang="pug">
.showcase
  FetchNav(v-slot="{ navigation }" target="examples")
    .item(v-for="item in getList(navigation)" :key="item._path" )
      .info
        h2.title {{ item.showcase.title }}
        .description {{ item.showcase.description }}
        .links
          Button.button(:to="localePath('/examples')" shape="circle" type="primary")
            Icon.icon(name="fa6-solid:code")
            | {{$t('examples')}}
          Button.button(:to="localePath('/docs/')" shape="circle" type="primary")
            Icon.icon(name="fa6-solid:book-open")
            | {{$t('docs')}}
      Card.preview(:padding="0")
        .open
          Tooltip(:content="$t('openNewTab')" placement="top-end")
            Button.link(:to="item.showcase.link || item.showcase.source" target="_blank")
              Icon(name="f7:link")
        client-only
          FrameExample(:src="item.showcase.source" :lazy="true")
          template(#placeholder)
            NuxtLink(:to="pathSanitizer.sanitize(item._path)")
              noscript
                img(:src="getPreview(item.preview)" loading="lazy")

</template>

<script lang="ts">
import { getPreview } from '../shared/assets'
import { flat } from '../shared/navigation'
import { usePathSanitizer } from '../shared/route'

export default {
  setup() {
    return {
      pathSanitizer: usePathSanitizer()
    }
  },
  methods: {
    getPreview,
    getList(navigation) {
      const examples = flat(navigation.children)

      return examples
        .filter(item => item.showcase)
        .sort((a, b) => a.showcase.order - b.showcase.order)
    }
  }
}
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
      .button
        .icon
          vertical-align: text-top
          margin-right: 0.3em
          size: 1.05em

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
        padding: 0.1em 0.6em
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
