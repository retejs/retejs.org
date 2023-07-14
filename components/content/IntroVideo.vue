<template lang="pug">
Intro.intro(:show="true")
</template>

<script>
import Intro from '../Intro.vue';

export default {
  components: {
    Intro,
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

+tablet
  .intro
    width: 100%
    padding-bottom: calc(100% / 16 * 9)
</style>
