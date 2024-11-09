<template lang="pug">
RefButton(
  :title="title"
  icon="fa6-solid:book-open"
  :to="link"
)
</template>

<script lang="ts">
import RefButton from '../shared/RefButton.vue'

export default {
  components: {
    RefButton
  },
  props: ['title', 'link']
}
</script>
