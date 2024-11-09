<template lang="pug">
RefButton(
  :title="title"
  icon="fa6-solid:link"
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
