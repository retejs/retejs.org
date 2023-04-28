<template lang="pug">
.examples
  FetchNav(v-slot="{ navigation }" target="examples")
    NavMenu(@open="drawer = true")
      template(#title) {{ $t('examples') }}
      ExamplesNav(:navigation="navigation")
    .content.markdown
      .sharethis-sticky-share-buttons
      ContentDocFix(:path="contentPath")
        template(#not-found)
          IViewAlert(type="warning") Examples section not found
    Drawer(v-model="drawer")
      .drawer-content
        ExamplesNav(:navigation="navigation")
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Drawer from '@/components/shared/Drawer.vue';
import ExamplesNav from '@/components/ExamplesNav.vue';
import FetchNav from '@/components/FetchNav.vue';
import ContentDocFix from '@/components/ContentDocFix.vue';
import NavMenu from '@/components/shared/NavMenu.vue';
import { alterTitle } from '../../shared/title';
import { omitLocale } from '../../shared/route';
import { useShareThis } from '../../shared/sharethis';

export default defineComponent({
  setup() {
    alterTitle('examplesPage.title');
    useShareThis();
  },
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    contentPath() {
      return `/${this.$i18n.locale}${omitLocale(this.$route.path, this.$i18n.locale)}`;
    },
    path() {
      return this.$route.path;
    },
  },
  components: {
    Drawer,
    ExamplesNav,
    FetchNav,
    NavMenu,
    ContentDocFix,
  },
});
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.examples
  display: flex
  text-align: left

  .content
    flex: 1
    position: relative
    padding: 2em
    overflow: auto
    +phone
      padding: 5vw
.drawer-content
  padding-bottom: 4em
</style>
