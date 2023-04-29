<template lang="pug">
.examples
  FetchNav(v-slot="{ navigation }" target="examples")
    NavMenu(@open="drawer = true")
      template(#title) {{ $t('examples') }}
      ExamplesNav(:navigation="navigation")
    .content.markdown
      RenderContent(:path="contentPath" :share="share")
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
import RenderContent from '@/components/RenderContent.vue';
import NavMenu from '@/components/shared/NavMenu.vue';
import { alterTitle } from '../../shared/title';
import { omitLocale } from '../../shared/route';

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
      return `/${this.$i18n.locale}${omitLocale(this.$route.path, this.$i18n.locale)}`;
    },
    path() {
      return this.$route.path;
    },
  },
  methods: {
    share(data) {
      if (data.share) return data.share.title;
      return `${data.title}, ${this.$t('share.example')}`;
    },
  },
  components: {
    Drawer,
    ExamplesNav,
    FetchNav,
    NavMenu,
    RenderContent,
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
