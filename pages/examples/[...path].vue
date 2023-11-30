<template lang="pug">
.examples
  FetchNav(v-slot="{ navigation }" target="examples")
    NavMenu(@open="drawer = true")
      template(#title) {{ $t('examples') }}
      ExamplesNav(:navigation="navigation")
    NuxtLink(:href="preview")
    .content.markdown
      RenderContent(
        :path="contentPath"
        :share="share"
        :title="data => !data.overview && $t('examplesPage.title', { title: data.title })"
        :largePreview="true"
      )
        template(#not-found)
          NotFound(:standalone="false")
    Drawer(v-model="drawer")
      .drawer-content
        ExamplesNav(:navigation="navigation")
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import Drawer from '@/components/shared/Drawer.vue';
import ExamplesNav from '@/components/ExamplesNav.vue';
import FetchNav from '@/components/FetchNav.vue';
import RenderContent from '@/components/RenderContent.vue';
import NavMenu from '@/components/shared/NavMenu.vue';
import { useContentPath } from '../../shared/content';
import { useDrawer } from '../../shared/drawer';
import NotFound from '@/components/shared/NotFound.vue';

export default defineComponent({
  setup() {
    const route = useRoute();
    const contentPath = useContentPath();
    const drawer = useDrawer();

    return {
      preview: route.path.replace('/examples/', '/preview/'),
      contentPath,
      drawer: drawer.active
    };
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
    NotFound,
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
