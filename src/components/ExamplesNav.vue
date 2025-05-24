<template lang="pug">
Nav(:list="navigation.children" :active="$route.path")
  template(#item="{ data }")
    .item
      .title {{ data.title }}
      ProTag(v-if="data.pro")
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import ProTag from './shared/ProTag.vue'

interface Navigation {
  children: any[]
}

interface Props {
  navigation: Navigation
}

defineProps<Props>()

const $route = useRoute()
</script>

<style lang="sass" scoped>
.item
  display: flex
  .title
    flex: 1
</style>
