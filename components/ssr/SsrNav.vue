<template lang="pug">
.ssr-nav
  div(v-for="item in list")
    SsrMenuItem(
      v-if="!item.children"
      :name="sanitizePath(item._path)"
      :to="sanitizePath(item._path)"
      :active="$route.path === sanitizePath(item._path)"
    ) {{ item.title }}
    SsrSubmenu.submenu(v-if="item.children" :name="sanitizePath(item._path)")
      template(#title) {{ item.title }}
      SsrNav(v-if="item.children" :list="item.children" :active="active")
</template>

<script>
import SsrMenuItem from './SsrMenuItem.vue';
import SsrSubmenu from './SsrSubmenu.vue';

export default {
  props: ['list', 'active'],
  methods: {
    sanitizePath(path) {
      return this.localePath(this.omitLocale(path, this.$i18n.locale));
    },
    omitLocale(path, locale) {
      return path.replace(new RegExp(`^/${locale}`), '');
    },
  },
  components: {
    SsrMenuItem,
    SsrSubmenu,
  },
};
</script>
