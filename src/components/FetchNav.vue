<template lang="pug">
ContentNavigation(v-slot="{ navigation }")
  slot(:navigation="resolveNavigation(navigation, 'docs')")
</template>

<script lang="ts">

export default {
  props: ['target'],
  methods: {
    resolveNavigation(navigation) {
      const localeContent = navigation.find(n => n._path === `/${this.$i18n.locale}`)
      const targetContent = localeContent.children.find(n => n._path === `/${this.$i18n.locale}/${this.target}`)

      return targetContent
    }
  }
}
</script>
