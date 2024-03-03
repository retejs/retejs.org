<template lang="pug">
Button(
  shape="circle"
  size="small"
  :to="link"
)
  Icon.icon(:name="icon")
  | {{title}}
</template>

<script>

export default {
  props: ['title', 'link', 'icon'],
};
</script>

<style lang="sass" scoped>
.icon
  margin-right: 0.3em
  vertical-align: text-bottom
</style>
