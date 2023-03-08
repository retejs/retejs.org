<template lang="pug">
.docs
  FetchNav(v-slot="{ navigation }" target="docs")
    Menu.menu(width="auto")
      h1.title {{ $t('documentation') }}
        .menu-burger(@click="drawer = true")
          Icon(type="md-menu" :size="20")
      .content-nav
        Nav(:list="navigation.children" :active="$route.path")
    .content
      ContentDoc(:path="contentPath")
        template(#not-found)
          Alert(type="warning") Docs section not found
    Drawer.drawer(v-model="drawer")
      Nav(:list="navigation.children" :active="$route.path")
</template>

<script>
import { defineComponent } from 'vue';
import Drawer from '@/components/shared/Drawer.vue';
import Nav from '@/components/Nav.vue';
import FetchNav from '@/components/FetchNav.vue';
import { alterTitle } from '../../shared/title';

export default defineComponent({
  setup() {
    alterTitle();
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    contentPath() {
      return `/${this.locale}${this.omitLocale(this.$route.path, this.locale)}`;
    },
    locale() {
      return this.$i18n.locale;
    },
  },
  methods: {
    sanitizePath(path) {
      return this.localePath(this.omitLocale(path, this.locale));
    },
    omitLocale(path, locale) {
      return path.replace(new RegExp(`^/${locale}`), '');
    },
  },
  components: {
    Drawer,
    Nav,
    FetchNav,
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.docs
  display: flex
  text-align: left
  .menu
    min-width: 200px
    .menu-burger
      display: none
      margin: 0 0.1em
  +phone
    .menu
      text-align: right
      width: 100%
      z-index: 1
      position: absolute
      right: 0
      .menu-burger
        display: unset
      .content-nav
        display: none
  .title
    margin: 1em
    +phone
      margin: 0.5em
  .content
    flex: 1
    position: relative
    padding: 2em
    overflow: auto
    +phone
      padding: 5vw

.burger-icon
  margin: 0 0.5em
</style>

<style lang="sass">
@import '@/assets/styles/media.sass'

.docs .content
  ul
    margin: 1em 3em
    +phone
      margin: 0.5em 1.5em
    li
      margin: 0.2em 0
  img
    margin: 1em 0
    max-width: 100%
</style>
