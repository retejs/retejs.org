<template lang="pug">
client-only
  Panel(:name="id" :id="id")
    a(:href="'#' + id" @click.prevent="") {{ question }}
    template(#content)
      slot
  template(#placeholder)
    SsrPanel(:id="id")
      a(:href="'#' + id") {{ question }}
      template(#content)
        slot
</template>

<script>
import SsrPanel from '../ssr/SsrPanel.vue';

export default {
  props: ['question', 'id'],
  components: {
    SsrPanel,
  },
};
</script>
