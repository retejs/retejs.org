<template lang="pug">
.examples
  FetchNav(v-slot="{ navigation }" target="examples")
    NavMenu(@open="drawer = true")
      template(#title) {{ $t('examples') }}
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
import NavMenu from '@/components/shared/NavMenu.vue';
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
    NavMenu,
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
    // hide scroll for articles with editors without overflow
    overflow: hidden
    +phone
      padding: 5vw
</style>
