<template lang="pug">
.examples
  FetchNav(v-slot="{ navigation }" target="examples")
    NavMenu(@open="drawer.setActive(true)")
      template(#title) {{ t('examples') }}
      ExamplesNav(:navigation="navigation")
    NuxtLink(:href="preview")
    .content.markdown
      RenderContent(
        :path="contentPath"
        :share="share"
        :title="data => !data.overview && t('examplesPage.title', { title: data.title })"
        :largePreview="true"
      )
        template(#not-found)
          NotFound(:standalone="false")
    Drawer(v-model="drawer.active")
      .drawer-content
        ExamplesNav(:navigation="navigation")
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import ExamplesNav from '@/components/ExamplesNav.vue'
import FetchNav from '@/components/FetchNav.vue'
import RenderContent from '@/components/RenderContent.vue'
import Drawer from '@/components/shared/Drawer.vue'
import NavMenu from '@/components/shared/NavMenu.vue'
import NotFound from '@/components/shared/NotFound.vue'

import { useContentPath } from '../../shared/content'
import { useDrawer } from '../../shared/drawer'

const route = useRoute()
const contentPath = useContentPath()
const drawer = useDrawer()

const { t } = useI18n()

const preview = route.path.replace('/examples/', '/preview/')

function share(data: any) {
  if (data.share) return data.share.title
  return `${data.title}, ${t('share.example')}`
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/media.sass'

.examples
  display: flex
  text-align: left

  .content
    flex: 1
    position: relative
    padding: 2em
    overflow: auto
    +phone
      padding: 5vw
.drawer-content
  padding-bottom: 4em
</style>
