<template lang="pug">
IViewAlert.banner(show-icon)
  .content
    .text
      slot(name="text")
    Tooltip(v-if="tooltip", placement="top")
      template(#content)
        .tooltip
          slot(name="tooltip")
      Button.question(
        type="text"
        shape="circle"
        @click="$emit('tooltip')"
      )
        Icon.icon(:name="tooltip.icon")
    Button.button(
      v-if="action"
      :target="action.target"
      :to="action.to"
      @click="$emit('action')"
    ) {{ action.label }}
  template(#icon)
    Icon.icon(:name="icon")
</template>

<script lang="ts">
export default {
  props: {
    icon: String,
    tooltip: {
      type: Object,
      default: null
    },
    action: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.banner
  padding-right: 8px
  .content
    display: flex
    align-items: center
    gap: 0.5em
    .text
      flex: 1
    .tooltip
      text-align: center
      max-width: 14em
      text-wrap: wrap
  .icon
    font-size: 1.25em
  .question
    padding: 0.2em 0.5em
    .icon
      vertical-align: text-top

</style>
