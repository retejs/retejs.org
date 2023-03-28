<template lang="pug">
client-only
  Panel
    | {{ question }}
    template(#content)
      slot
  template(#placeholder)
    SsrPanel(:text="question")
      slot
</template>

<script>
import SsrPanel from '../ssr/SsrPanel.vue';

export default {
  props: ['question'],
  components: {
    SsrPanel,
  },
};
</script>
