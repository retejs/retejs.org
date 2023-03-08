<template lang="pug">
Menu(width="auto" :active-name="active" :open-names="cascadePaths")
  template(v-for="item in list")
    MenuItem(
      v-if="!item.children"
      :name="sanitizePath(item._path)"
      :to="sanitizePath(item._path)"
    )
      slot(name="item" :data="item") {{ item.title }}
    Submenu.submenu(v-if="item.children" :name="sanitizePath(item._path)")
      template(#title) {{ item.title }}
      Nav(:list="item.children" :active="active")
</template>

<script>
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
  },
  methods: {
    sanitizePath(path) {
      return this.localePath(this.omitLocale(path, this.$i18n.locale));
    },
    omitLocale(path, locale) {
      return path.replace(new RegExp(`^/${locale}`), '');
    },
  },
};
</script>
