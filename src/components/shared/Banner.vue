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
        NuxtIcon.icon(:name="tooltip.icon")
    Button.button(
      v-if="action"
      :target="action.target"
      :to="action.to"
      @click="$emit('action')"
    ) {{ action.label }}
  template(#icon)
    NuxtIcon.icon(:name="icon")
</template>

<script setup lang="ts">
interface TooltipConfig {
  icon: string
}

interface ActionConfig {
  label: string
  to?: string
  target?: string
}

interface Props {
  icon: string
  tooltip?: TooltipConfig | null
  action?: ActionConfig | null
}

defineProps<Props>()

defineEmits<{
  tooltip: []
  action: []
}>()
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
