<template lang="pug">
Drawer(
  :value="value"
  @input="$emit('input', $event)"
  :placement="placement"
)
  slot
</template>

<script>
import { Drawer } from 'view-ui-plus/dist/viewuiplus.min.esm';

export default {
  props: {
    value: Boolean,
    placement: String,
  },
  components: {
    Drawer,
  },
  mounted() {
    this.$router.afterEach(() => {
      this.$emit('input', false);
    });
  },
};
</script>

<style lang="sass">
@import '@/assets/styles/vars.sass'

.ivu-drawer-mask
  top: var(--header-offset)
  height: calc(100% - var(--header-offset))
.ivu-drawer
  top: var(--header-offset)
  height: calc(100vh - var(--header-offset))
.ivu-drawer-body
  padding: 0
</style>
