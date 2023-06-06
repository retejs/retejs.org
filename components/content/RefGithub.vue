<template lang="pug">
Button(
  shape="circle"
  size="small"
  icon="logo-github"
  :to="link"
)
  | {{title}}
</template>

<script>

export default {
  props: ['title', 'link'],
};
</script>
