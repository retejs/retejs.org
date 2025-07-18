<template lang="pug">
.api-overview(:class="{ top }")
  FetchNav(v-slot="{ navigation }" target="docs")
    Card.item(v-for="data of getList(navigation)", :key="data.path")
      template(#title)
        NuxtLink(:to="sanitize(data.path)") {{ data.title }}
        Tooltip(content="Open on NPM", placement="top")
          NuxtLink(:to="'https://www.npmjs.com/package/' + data.title", target="_blank", @click.stop="")
            Icon.npm.icon(name="ion:logo-npm")
        Tooltip(v-if="data.repository" content="Open repository", placement="top")
          NuxtLink(:to="data.repository", target="_blank", @click.stop="")
            Icon.gh.icon(name="ion:logo-github")
</template>

<script setup lang="ts">
import { usePathSanitizer } from '../../shared/route'
import ExampleCard from '../shared/ExampleCard.vue'

interface Props {
  filter?: string
  top?: boolean
}

const props = defineProps<Props>()

const { sanitize } = usePathSanitizer()
const filter = props.filter
  ? props.filter.split(',')
  : null

function getList(navigation: any) {
  const api = navigation.children.find((n: any) => n.path.endsWith('/docs/api'))

  if (!api) return []

  const list = api.children
    .filter((child: any) => !child.placeholder && !child.overview)
    .filter((child: any) => !filter || filter.includes(child.title))

  return list
}
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
      margin: 0 0.5em
      &.npm
        width: 2em
        height: 2em
        color: #c20000
      &.gh
        width: 1.6em
        height: 1.6em
        color: #000

</style>
