<template lang="pug">
.ivu-collapse-item.ivu-collapse-item-active
  .ivu-collapse-header
    i.ivu-icon.ivu-icon-ios-arrow-forward(style='')
    slot
  .ivu-collapse-content
    .ivu-collapse-content-box
      slot(name="content")
</template>

<script lang="ts">
export default {
  props: ['text']
}
</script>
