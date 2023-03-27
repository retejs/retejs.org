<template lang="pug">
IViewContent.content
  NuxtPage
</template>

<script>
import { Content as IViewContent } from 'view-ui-plus/dist/viewuiplus.min.esm';

export default {
  components: {
    IViewContent,
  },
};
</script>

<style lang="sass" scoped>
.content
  flex: 1
  max-width: auto
  align-self: center
  text-align: center
  width: 100%
</style>
