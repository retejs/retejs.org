<template lang="pug">
client-only
  Panel(:name="id")
    h2(:id="id")
      a(:href="'#' + id" @click.prevent="") {{ question }}
    template(#content)
      slot
  template(#placeholder)
    SsrPanel
      h2(:id="id")
        a(:href="'#' + id") {{ question }}
      template(#content)
        slot
</template>

<script lang="ts">
import SsrPanel from '../ssr/SsrPanel.vue'

export default {
  props: ['question', 'id'],
  components: {
    SsrPanel
  }
}
</script>

<style lang="sass" scoped>
h2
  margin: 0
  font-size: 1em
  display: inline-block
  font-weight: normal
</style>
