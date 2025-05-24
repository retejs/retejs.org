<template lang="pug">
RefButton(
  :title="title"
  icon="fa6-solid:book-open"
  :link="link"
)
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import RefButton from '../shared/RefButton.vue'

interface Props {
  title: string
  link: string
}

defineProps<Props>()
</script>
