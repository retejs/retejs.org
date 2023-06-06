<template lang="pug">
Button(
  shape="circle"
  size="small"
  icon="ios-book"
  :to="link"
)
  | {{title}}
</template>

<script>

export default {
  props: ['title', 'link'],
};
</script>
