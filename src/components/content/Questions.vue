<template lang="pug">
Collapse.collapse(accordion v-model="target")
  slot
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const target = ref(route.hash.split('#')[1])

watch(target, (value) => {
  const name = value[0]
  window.history.pushState({}, '', `#${name}`)
})
</script>

<style lang="sass" scoped>
.collapse
  p:first-child
    margin: 0
  p:last-child
    margin-bottom: 0
  :deep(.ivu-collapse-header)
    height: auto
    h1,h2,h3,h4,h5,h6
      display: inline

</style>
