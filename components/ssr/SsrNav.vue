<template lang="pug">
.ssr-nav
  div(v-for="item in list")
    SsrMenuItem(
      v-if="!item.children"
      :name="sanitize(item._path)"
      :to="sanitize(item._path)"
      :active="$route.path === sanitize(item._path)"
    ) {{ item.title }}
    SsrSubmenu.submenu(v-if="item.children" :name="sanitize(item._path)")
      template(#title) {{ item.title }}
      SsrNav(v-if="item.children" :list="item.children" :active="active")
</template>

<script>
import SsrMenuItem from './SsrMenuItem.vue';
import SsrSubmenu from './SsrSubmenu.vue';
import { usePathSanitizer } from '../../shared/route';

export default {
  props: ['list', 'active'],
  setup() {
    const { sanitize } = usePathSanitizer();

    return {
      sanitize,
    };
  },
  components: {
    SsrMenuItem,
    SsrSubmenu,
  },
};
</script>
