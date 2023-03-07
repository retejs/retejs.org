<template lang="pug">
.examples
  FetchNav(v-slot="{ navigation }" target="examples")
    Menu.menu(width="auto")
      h1.title {{ $t('examples') }}
        .menu-burger(@click="drawer = true")
          Icon(type="md-menu" :size="20")
      .content-nav
        ExamplesNav(:navigation="navigation")
    .content
      ContentDoc(:path="contentPath")
        template(#not-found)
          Alert(type="warning") Examples section not found
    Drawer.drawer(v-model="drawer")
      ExamplesNav(:navigation="navigation")
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Drawer from '@/components/shared/Drawer.vue';
import ExamplesNav from '@/components/ExamplesNav.vue';
import FetchNav from '@/components/FetchNav.vue';
import { alterTitle } from '../../shared/title';

export default defineComponent({
  setup() {
    alterTitle('examplesPage.title');
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    contentPath() {
      return `/${this.$i18n.locale}${this.omitLocale(this.$route.path, this.$i18n.locale)}`;
    },
    path() {
      return this.$route.path;
    },
  },
  methods: {
    omitLocale(path, locale) {
      return path.replace(new RegExp(`^/${locale}`), '');
    },
  },
  components: {
    Drawer,
    ExamplesNav,
    FetchNav,
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.examples
  display: flex
  text-align: left
  .menu
    min-width:  200px
    .title
      margin: 1em
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

  .content
    flex: 1
    position: relative
    padding: 2em
    overflow: auto
    +phone
      padding: 5vw
</style>
