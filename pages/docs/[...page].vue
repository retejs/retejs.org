<template lang="pug">
.docs
  FetchNav(v-slot="{ navigation }" target="docs")
    NavMenu(@open="drawer = true")
      template(#title) {{ $t('documentation') }}
      Nav(:list="navigation.children" :active="$route.path")
    .content.markdown
      ContentDocFix(:path="contentPath")
        template(#not-found)
          IViewAlert(type="warning") Docs section not found
    Drawer(v-model="drawer")
      .drawer-content
        Nav(:list="navigation.children" :active="$route.path")
</template>

<script>
import { defineComponent } from 'vue';
import Drawer from '@/components/shared/Drawer.vue';
import Nav from '@/components/Nav.vue';
import FetchNav from '@/components/FetchNav.vue';
import ContentDocFix from '@/components/ContentDocFix.vue';
import NavMenu from '@/components/shared/NavMenu.vue';
import { alterTitle } from '../../shared/title';
import { omitLocale } from '../../shared/route';

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
      return `/${this.locale}${omitLocale(this.$route.path, this.locale)}`;
    },
    locale() {
      return this.$i18n.locale;
    },
  },
  components: {
    Drawer,
    Nav,
    FetchNav,
    NavMenu,
    ContentDocFix,
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
  img
    margin: 1em 0
    max-width: 100%

.drawer-content
  padding-bottom: 4em
</style>
