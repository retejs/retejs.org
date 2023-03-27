<template lang="pug">
Nav(:list="navigation.children" :active="$route.path")
  template(#item="{ data }")
    .item
      .title {{ data.title }}
      Tag.tag(v-if="data.pro" color="blue" size="6px") Pro
</template>

<script>
export default {
  props: ['navigation'],
};
</script>

<style lang="sass" scoped>
.item
  display: flex
  .title
    flex: 1
  .tag
    height: 1.4em
    line-height: 1.3em
    padding: 0 0.3em
    margin-left: 1em
</style>
