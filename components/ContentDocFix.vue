<template lang="pug">
ContentRenderer(:value="data")
  template(#empty)
    slot(name="not-found")
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['path'],
  async setup(props) {
    // eslint-disable-next-line no-undef
    const { data } = await useAsyncData(props.path, () => queryContent(props.path).findOne());

    return {
      data,
    };
  },
});
</script>
