<template lang="pug">
.home
  Head
    Title {{ $t('name') }} - {{ $t('main.title') }}
  .section
    p.title {{ $t('main.title') }}
    p.description {{ $t('main.description') }}
  .links
    .star
      iframe(:src="gitHubBadge" frameborder="0" scrolling="0")
    a.origin(href="https://stand-with-ukraine.pp.ua" target="_blank")
      img(:src="originBadge")
  Logo.logo(:hover="logoIsHovered" :zoomIn="false")
  .highlights.section
    .highlight
      .title {{ $t('main.highlights.ts.title')}}
      .description {{ $t('main.highlights.ts.description') }}
    .highlight
      .title {{ $t('main.highlights.processing.title')}}
      .description {{ $t('main.highlights.processing.description') }}
    .highlight
      .title {{ $t('main.highlights.tailorable.title')}}
      .description {{ $t('main.highlights.tailorable.description') }}
</template>

<script>
import Logo from '@/components/Logo.vue';

export default {
  data() {
    return {
      logoIsHovered: false,
      gitHubBadge: 'https://ghbtns.com/github-btn.html?user=retejs&repo=rete&type=star&count=true&size=large',
      originBadge: 'https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7',
    };
  },
  components: {
    Logo,
  },
  mounted() {
    setTimeout(() => { this.logoIsHovered = true; }, 1000);
    setTimeout(() => { this.logoIsHovered = false; }, 3000);
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/styles/common.sass'
@import '@/assets/styles/media.sass'

.home
  .links
    display: grid
    grid-gap: 1em
    grid-auto-flow: column
    margin: 1.5em auto 0 auto
    width: fit-content
    align-items: center
    .origin img
      height: 26px
    .star iframe
      width: 150px
      height: 30px
  .logo
    max-height: calc(15vh + 15vw)
    width: 70vw
    max-width: 40em
    margin: calc(1vw + 3vh)
</style>
