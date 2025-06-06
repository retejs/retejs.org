<template lang="pug">
Drawer(
  :value="value"
  @input="$emit('input', $event)"
  :placement="placement"
)
  slot
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Drawer } from 'view-ui-plus-es'
import { useRouter } from 'vue-router'

interface Props {
  value?: boolean
  placement?: 'top' | 'right' | 'bottom' | 'left'
}

defineProps<Props>()

const emit = defineEmits<{
  input: [value: boolean]
}>()

onMounted(() => {
  const router = useRouter()

  router.afterEach(() => {
    emit('input', false)
  })
})
</script>

<style lang="sass">
@import '@/assets/styles/vars.sass'

body
  .ivu-drawer-mask
    top: var(--header-offset)
    height: calc(100% - var(--header-offset))
  .ivu-drawer
    top: var(--header-offset)
    height: calc(100vh - var(--header-offset))
  .ivu-drawer-body
    padding: 0
</style>
