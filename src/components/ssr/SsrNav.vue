<template lang="pug">
.ssr-nav
  div(v-for="item in list")
    SsrMenuItem(
      v-if="!item.children"
      :name="sanitize(item.path)"
      :to="sanitize(item.path)"
      :active="$route.path === sanitize(item.path)"
    )
      slot(name="item" :data="item") {{ item.title }}
    SsrSubmenu.submenu(v-if="item.children" :name="sanitize(item.path)")
      template(#title) {{ item.title }}
      SsrNav(v-if="item.children" :list="item.children" :active="active")
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { usePathSanitizer } from '../../shared/route'
import SsrMenuItem from './SsrMenuItem.vue'
import SsrSubmenu from './SsrSubmenu.vue'

interface Props {
  list: any[]
  active: string
}

defineProps<Props>()

const $route = useRoute()
const { sanitize } = usePathSanitizer()
</script>
