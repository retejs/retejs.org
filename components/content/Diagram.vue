<template lang="pug">
img(:src="'/diagrams/'+name+'.svg'")

</template>

<script>
export default {
  props: ['name']
}
</script>
