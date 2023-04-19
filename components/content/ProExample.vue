<template lang="pug">
IViewAlert.alert(show-icon)
  .content
    .text {{ $t('examplesPage.proExample.alert') }}
    Button.button(:to="patreon.link" target="_blank") {{ $t('examplesPage.proExample.getAccess') }}
  template(#icon)
    Icon.icon(type="md-finger-print")
BaseExample
  iframe(
    :src="src"
    title="Rete.js v2"
  )
</template>

<script>
import sponsor from '../../consts/sponsor.json';
import BaseExample from '../shared/BaseExample.vue';

export default {
  props: {
    src: String,
  },
  data() {
    return {
      ...sponsor,
    };
  },
  components: {
    BaseExample,
  },
};
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.alert
  padding-right: 8px
  .content
    display: flex
    align-items: center
    .text
      flex: 1
  .icon
    font-size: 1.25em

iframe
  width: 100%
  height: 100%
  border: none
  text-align: left
</style>
