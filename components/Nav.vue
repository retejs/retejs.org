<template lang="pug">
client-only
  Menu(width="auto" :active-name="activeName" :open-names="cascadePaths")
    template(v-for="item in list")
      MenuItem(
        v-if="!item.children && !item.placeholder"
        :name="sanitizePath(item._path)"
        :to="sanitizePath(item._path)"
      )
        slot(name="item" :data="item") {{ item.title }}
      Submenu.submenu(v-if="item.children" :name="sanitizePath(item._path)")
        template(#title) {{ item.title }}
        Nav(:list="item.children" :active="activeName")
  template(#placeholder)
    SsrNav(:list="list" :active="activeName")
</template>

<script>
import SsrNav from './ssr/SsrNav.vue';

export default {
  props: ['list', 'active'],
  computed: {
    cascadePaths() {
      const pathSegments = this.active.split('/');

      const n = pathSegments.reduce((paths, curr, i) => {
        const path = i === 0 ? curr : `${paths[i - 1]}/${curr}`;

        return [...paths, path];
      }, []);

      return n;
    },
    activeName() {
      return this.active.replace(/\/$/, '');
    },
  },
  methods: {
    sanitizePath(path) {
      return this.localePath(this.omitLocale(path, this.$i18n.locale));
    },
    omitLocale(path, locale) {
      return path.replace(new RegExp(`^/${locale}`), '');
    },
  },
  components: {
    SsrNav,
  },
};
</script>
