<template lang="pug">
.submenu
  li.ivu-menu-submenu
    .ivu-menu-submenu-title
      slot(name="title")
      i.ivu-icon.ivu-icon-ios-arrow-down.ivu-menu-submenu-title-icon
  .sub
    slot
</template>

<style lang="sass" scoped>
.sub
  padding-left: 43px - 24px
</style>
