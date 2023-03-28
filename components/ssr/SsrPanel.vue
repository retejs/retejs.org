<template lang="pug">
.ivu-collapse-item.ivu-collapse-item-active
  .ivu-collapse-header
    i.ivu-icon.ivu-icon-ios-arrow-forward(style='')
    | {{ text }}
  .ivu-collapse-content
    .ivu-collapse-content-box
      slot
</template>

<script>
export default {
  props: ['text'],
};
</script>
