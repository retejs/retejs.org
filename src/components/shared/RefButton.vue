<template lang="pug">
Button(
  shape="circle"
  size="small"
  :to="link"
)
  NuxtIcon.icon(:name="icon")
  | {{title}}
</template>

<script setup lang="ts">
interface Props {
  title: string
  link: string
  icon: string
}

defineProps<Props>()
</script>

<style lang="sass" scoped>
.icon
  margin-right: 0.3em
  vertical-align: text-bottom
  max-width: 14px
</style>
