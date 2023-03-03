<template lang="pug">
.examples
  Menu.menu(width="auto")
    h1.title() {{ $t('examples') }}
    FetchNav(v-slot="{ navigation }" target="examples")
      Nav(:list="navigation.children")
  .content
    ContentDoc(:path="contentPath")
      template(#not-found)
        Alert(type="warning") Docs section not found

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Nav from '@/components/Nav.vue';
import FetchNav from '@/components/FetchNav.vue';

export default defineComponent({
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
    Nav,
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

  .content
    flex: 1
    position: relative
    padding: 2em
    overflow: auto
    +phone
      padding: 5vw
</style>
