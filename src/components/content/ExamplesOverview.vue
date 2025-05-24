<template lang="pug">
.overview(:class="{ top }")
  FetchNav(v-slot="{ navigation }" :target="target")
    template(v-for="data of getList(navigation)")
      NuxtLink(:to="sanitize(data.path)")
        ExampleCard.item(
          :title="data.title"
          :preview="data.preview"
          :stack="isGroup(data) && data.preview"
          :pro="data.pro"
        )
</template>

<script setup lang="ts">
import { flat } from '../../shared/navigation'
import { usePathSanitizer } from '../../shared/route'
import ExampleCard from '../shared/ExampleCard.vue'

interface Props {
  top?: boolean
  filter?: string
}

const props = defineProps<Props>()

const { sanitize } = usePathSanitizer()

function extractGroups(examples: any[]) {
  return examples
    .filter(item => item.overviewGroup)
    .filter(item => props.filter
      ? props.filter !== sanitize(item.path)
      : true)
}

function isGroup(item: any) {
  return item.overviewGroup
}

function isInsideGroup(item: any, group: any) {
  return item.path !== group.path && item.path.startsWith(group.path)
}

function isInsideGroups(item: any, groups: any[]) {
  return groups.some(g => isInsideGroup(item, g))
}

function getList(navigation: any) {
  const examples = flat(navigation.children)
  const groups = extractGroups(examples)

  const list = examples
    .filter((item: any) => !props.filter || sanitize(item.path).startsWith(props.filter))
    .filter((item: any) => isGroup(item) || !item.noPreview && !item.placeholder)
    .filter((item: any) => !isInsideGroups(item, groups))
    .filter((item: any) => !isGroup(item) || groups.includes(item))
    .map((item: any) => {
      if (!isGroup(item)) return item
      const groupExamples = examples.filter((example: any) => isInsideGroup(example, item))

      return {
        ...item,
        preview: groupExamples[0]?.preview
      }
    })
    .filter((item: any) => props.top
      ? item.top
      : !item.top)
    .sort((a: any, b: any) => (b.top || 0) - (a.top || 0))

  return list
}

const target = 'examples'
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
