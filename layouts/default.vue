<template lang="pug">
.app
  VitePwaManifest
  Header
  ShareThis
    Content
      slot
  Footer
  .report-button(content="Report a bug" placement="left-start")
    Button(
      type="warning"
      shape="circle"
      icon="md-bug"
      @click="openReportDialog($t('report-bug'))"
    )
</template>

<script>
import { defineComponent } from 'vue';
import Header from '../components/Header.vue';
import Content from '../components/Content.vue';
import Footer from '../components/Footer.vue';
import { openReportDialog } from '../bug-handler';
import { seoLang } from '../shared/seoLang';
import ShareThis from '../components/ShareThis.vue';

export default defineComponent({
  name: 'app',
  setup() {
    seoLang();
  },
  components: {
    Header,
    Content,
    Footer,
    ShareThis,
  },
  methods: {
    openReportDialog,
  },
});
</script>

  <style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css?family=Ubuntu:300,400,500,700')

  .app
    display: flex
    min-height: 100vh
    align-items: center
    flex-direction: column
    font-family: Ubuntu
    font-size: 1rem

    .report-button
      position: fixed
      right: 1em
      bottom: 1em
  </style>

<style lang="sass">
@import '@/assets/styles/common.sass'
</style>
