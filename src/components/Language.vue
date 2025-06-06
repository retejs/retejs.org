<template lang="pug">
.lang
  client-only
    Select.select.upper(
      :model-value="locale"
      @on-change="setLocale"
      size="small"
    )
      Option.upper(v-for="lang in locales" :value="lang.code" :key="lang.code")
        | {{lang.code}}
    template(#placeholder)
      SsrSelect {{ locale }}
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import SsrSelect from './ssr/SsrSelect.vue'
import { useSwitchLocalePath } from '#imports'

const i18n = useI18n()
const router = useRouter()
const switchLocalePath = useSwitchLocalePath()
const locale = i18n.locale
// @ts-ignore
const locales = i18n.locales

const setLocale = (lang: string) => {
  router.push(switchLocalePath(lang))
}
</script>

<style lang="sass" scoped>
.lang
  float: right
  padding-right: 1em
  .select
    width: 4em
  .upper
    text-transform: uppercase
</style>
