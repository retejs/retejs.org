<template lang="pug">
RefButton(
  :title="title"
  icon="fa6-brands:github"
  :link="link"
)
</template>

<script setup lang="ts">
import RefButton from '../shared/RefButton.vue'

interface Props {
  title: string
  link: string
}

defineProps<Props>()
</script>
