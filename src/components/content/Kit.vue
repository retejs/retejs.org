<template lang="pug">
Banner(
  icon="heroicons:rocket-launch"
  :tooltip="{ icon: 'tabler:clipboard-copy' }"
  :action="{ label: t('kit.banner.button'), to: localePath(link) }"
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

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLocalePath, useNuxtApp } from '#imports'
import Banner from '../shared/Banner.vue'

const { t } = useI18n()
const localePath = useLocalePath()
const { $Notice } = useNuxtApp()

const link = '/docs/development/rete-kit'
const command = 'npx rete-kit app'

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(command)
    $Notice.success({
      title: t('kit.banner.copyNotification.success')
    })
  } catch (error) {
    console.error(error)

    $Notice.error({
      title: t('kit.banner.copyNotification.error')
    })
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
