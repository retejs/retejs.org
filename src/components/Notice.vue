<template lang="pug">
.notice
  .text
    | {{ t('currentVersionNotice.youAreBrowsing') }}
    | {{ t('currentVersionNotice.checkOut') }}
    | !{' '}
    a(href="https://rete.js.org" target="_blank") {{ t('currentVersionNotice.docsV1') }}
    | {{ t('currentVersionNotice.orGetStarted' )}}
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<style lang="sass" scoped>
@import '@/assets/styles/vars.sass'
$text-width: 700px

.notice
  width: 100%
  background: #697984
  color: white
  text-align: center
  font-weight: 100
  font-size: 0.9rem
  height: $header-offset
  overflow: hidden
  .text
    white-space: nowrap
    padding: 0.2em 1em
    animation: marquee 15s linear infinite
    a
      color: wheat

@keyframes marquee
  0%
    transform: translateX(0px)
  10%
    transform: translateX(0px)
  50%
    transform: translateX(min(0px, calc(0px - $text-width + 100vw)))
  60%
    transform: translateX(min(0px, calc(0px - $text-width + 100vw)))
  100%
    transform: translateX(0px)
</style>
