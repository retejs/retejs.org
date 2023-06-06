<template lang="pug">
Button(
  shape="circle"
  size="small"
  icon="ios-code"
  :to="link"
)
  | {{title}}
</template>

<script>

export default {
  props: ['title', 'link'],
};
</script>
