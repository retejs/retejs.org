<template lang="pug">
client-only
  Menu(width="100%" :active-name="activeName" :open-names="cascadePaths")
    template(v-for="item in list")
      MenuItem(
        v-if="!item.children && !item.placeholder"
        :name="sanitize(item.path)"
        :to="sanitize(item.path)"
      )
        slot(name="item" :data="item")
          .title {{ item.title }}
      Submenu.submenu(v-if="item.children" :name="sanitize(item.path)")
        template(#title)
          .title {{ item.title }}
        Nav(:list="item.children" :active="activeName")
  template(#placeholder)
    SsrNav(:list="list" :active="activeName")
      template(#item="{ data }")
        slot(name="item" :data="data")
          .title {{ data.title }}
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePathSanitizer } from '../shared/route'
import SsrNav from './ssr/SsrNav.vue'

interface Props {
  list: any[]
  active: string
}

const props = defineProps<Props>()

const { sanitize } = usePathSanitizer()

const cascadePaths = computed(() => {
  const pathSegments = props.active.split('/')

  return pathSegments.reduce<string[]>((paths, curr, i) => {
    const path = i === 0
      ? curr
      : `${paths[i - 1]}/${curr}`

    return [...paths, path]
  }, [])
})

const activeName = computed(() => {
  return props.active.replace(/\/$/, '')
})
</script>

<style lang="scss" scoped>
.title {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
