<template lang="pug">
Collapse.collapse(accordion)
  slot
</template>

<script>
export default {
  data() {
    return {
    };
  },
};
</script>

<style lang="sass">
.collapse p:first-child
  margin: 0
.collapse p:last-child
  margin-bottom: 0
</style>
