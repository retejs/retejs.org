<template lang="pug">
Nav(:list="navigation.children" :active="$route.path")
  template(#item="{ data }")
    .item
      .title {{ data.title }}
      ProTag(v-if="data.pro")
</template>

<script lang="ts">
import ProTag from './shared/ProTag.vue'

export default {
  props: ['navigation'],
  components: {
    ProTag
  }
}
</script>

<style lang="sass" scoped>
.item
  display: flex
  .title
    flex: 1
</style>
