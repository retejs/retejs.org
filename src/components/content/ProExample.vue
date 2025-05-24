<template lang="pug">
Banner(
  icon="ion:finger-print"
  :tooltip="{ icon: 'f7:question-circle' }"
  :action="{ label: t('examplesPage.proExample.getAccess'), to: patreon.link, target: '_blank' }"
)
  template(v-slot:text) {{ t('examplesPage.proExample.alert') }}
  template(v-slot:tooltip) {{ t('examplesPage.proExample.info') }}

BaseExample
  iframe(
    :src="src"
    title="Rete.js v2"
  )
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Banner from '../shared/Banner.vue'
import BaseExample from '../shared/BaseExample.vue'
import sponsor from '../../consts/sponsor.json'

interface Props {
  src: string
}

defineProps<Props>()

const { t } = useI18n()

const { patreon } = sponsor
</script>

<style lang="sass" scoped>
iframe
  width: 100%
  height: 100%
  border: none
  text-align: left
</style>
