<template lang="pug">
Banner(
  icon="heroicons:rocket-launch"
  :tooltip="{ icon: 'tabler:clipboard-copy' }"
  :action="{ label: $t('kit.banner.button'), to: localePath(link) }"
  @tooltip="copyToClipboard"
)
  template(v-slot:text)
    i18n-t(keypath='kit.banner.text')
      template(v-slot:link)
        NuxtLink(:to="link") Rete Kit
  template(v-slot:tooltip)
    i18n-t(keypath='kit.banner.tooltip')
      template(v-slot:command)
        .command {{ command }}
</template>

<script lang="ts">
import Banner from '../shared/Banner.vue'

export default {
  data() {
    return {
      link: '/docs/development/rete-kit',
      command: 'npx rete-kit app'
    }
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.command)
        this.$Notice.success({
          title: this.$t('kit.banner.copyNotification.success')
        })
      } catch (error) {
        console.error(error)

        this.$Notice.error({
          title: this.$t('kit.banner.copyNotification.error')
        })
      }
    }
  },
  components: {
    Banner
  }
}
</script>

<style lang="sass" scoped>
.command
  font-family: monospace
  border: 1px solid #e0e0e0
  display: inline-block
  padding: 0 0.2em
  border-radius: 0.3em
</style>
