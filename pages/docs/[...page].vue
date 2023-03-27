<template lang="pug">
.docs
  FetchNav(v-slot="{ navigation }" target="docs")
    NavMenu(@open="drawer = true")
      template(#title) {{ $t('documentation') }}
      Nav(:list="navigation.children" :active="$route.path")
    .content
      ContentDoc(:path="contentPath")
        template(#not-found)
          Alert(type="warning") Docs section not found
    Drawer(v-model="drawer")
      .drawer-content
        Nav(:list="navigation.children" :active="$route.path")
</template>

<script>
import { defineComponent } from 'vue';
import Drawer from '@/components/shared/Drawer.vue';
import Nav from '@/components/Nav.vue';
import FetchNav from '@/components/FetchNav.vue';
import NavMenu from '@/components/shared/NavMenu.vue';
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
    NavMenu,
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'
$offset: 60px

.docs
  display: flex
  text-align: left
  .content
    flex: 1
    position: relative
    padding: 2em
    // hide scroll for articles with editors without overflow
    overflow: hidden
    +phone
      padding: 5vw
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

.drawer-content
  padding-bottom: 4em
</style>
