<template lang="pug">
Collapse.collapse(accordion v-model="target")
  slot
</template>

<script>
export default {
  data() {
    return {
      target: this.$route.hash.split('#')[1],
    };
  },
  watch: {
    target(value) {
      const name = value[0];

      window.history.pushState({}, '', `#${name}`);
    },
  },
};
</script>

<style lang="sass">
.collapse p:first-child
  margin: 0
.collapse p:last-child
  margin-bottom: 0
</style>
