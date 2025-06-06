<template lang="pug">
NuxtLink.ivu-menu-item(
  :to="to"
  :class="{ 'ivu-menu-item-active': active }"
)
  slot
</template>

<script setup lang="ts">
interface Props {
  to: string
  active?: boolean
}

defineProps<Props>()
</script>
