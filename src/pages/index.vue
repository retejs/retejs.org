<template lang="pug">
.home
  Head
    Title {{ title }}
  .section
    p.title {{ t('main.title') }}
    p.description {{ t('main.description') }}
  .links
    .star
      iframe(:src="gitHubBadge" frameborder="0" scrolling="0")
    a.origin(href="https://stand-with-ukraine.pp.ua" target="_blank")
      img(:src="originBadge" alt="Stand with Ukraine")
  Logo.logo(v-if="!intro" :hover="logoIsHovered" :zoomIn="false")
  Button.intro-button(v-if="!intro" shape="circle" type="primary" @click="intro = true")
    NuxtIcon.icon(name="fa6-brands:youtube")
    | Intro
  Intro.intro(:show="intro" :scroll="true" :autoplay="true")
  .highlights.section
    .highlight
      .title {{ t('main.highlights.ts.title')}}
      .description {{ t('main.highlights.ts.description') }}
    .highlight
      .title {{ t('main.highlights.processing.title')}}
      .description {{ t('main.highlights.processing.description') }}
    .highlight
      .title {{ t('main.highlights.tailorable.title')}}
      .description {{ t('main.highlights.tailorable.description') }}
  Showcase
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSeoMeta } from '#imports'

import Logo from '@/components/Logo.vue'
import Showcase from '@/components/Showcase.vue'
import { mainPreview } from '../shared/assets'

const { t } = useI18n()
const title = `${t('name')} - ${t('main.title')}`
const description = t('main.description')

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
  ogImage: mainPreview,
  twitterSite: 'rete_js',
  twitterCreator: 'rete_js',
  twitterImageSrc: mainPreview
})

const intro = ref(false)
const logoIsHovered = ref(false)
const gitHubBadge = 'https://ghbtns.com/github-btn.html?user=retejs&repo=rete&type=star&count=true&size=large'
const originBadge = 'https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7'

onMounted(() => {
  setTimeout(() => {
    logoIsHovered.value = true
  }, 1000)
  setTimeout(() => {
    logoIsHovered.value = false
  }, 3000)
})
</script>

<style lang="sass" scoped>
@import '@/assets/styles/common.sass'
@import '@/assets/styles/media.sass'

.home
  .links
    display: grid
    grid-gap: 1em
    grid-auto-flow: column
    margin: 1.5em auto 0 auto
    width: fit-content
    align-items: center
    .origin img
      height: 26px
    .star iframe
      width: 160px
      height: 30px
  .logo
    display: inline-block
    height: calc(15vh + 15vw)
    width: calc(25vh + 25vw)
    max-width: 40em
    margin: calc(3vw + 1vh)
    +phone
      $k: 1.2
      height: calc(15vh * $k + 15vw * $k)
      width: calc(25vh * $k + 25vw * $k)
      max-width: 90vw
  .intro-button
    margin: auto
    display: block
    .icon
      font-size: 1.2em
      margin-right: 0.3em
      vertical-align: text-top
  .intro
    margin: 2em auto 0 auto
    +phone
      margin: 2em 0
      width: 100%
      padding-bottom: calc(100% / 16 * 9)
      border-radius: 0
</style>
