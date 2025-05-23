<template lang="pug">
.menu-items
  MenuItem(name="docs", :class="activeClass('docs')", :to="localePath('/docs/')") {{ $t('docs') }}
  MenuItem(name="examples", :class="activeClass('examples')", :to="localePath('/examples')") {{ $t('examples') }}
  MenuItem.highlight(name="studio", target="_blank", to="https://studio.retejs.org") Studio
  MenuItem(name="sponsor",:class="activeClass('sponsor')", :to="localePath('/sponsor')") {{ $t('sponsor') }}
</template>

<style lang="sass" scoped>
.menu-items
  white-space: nowrap
  .highlight
    color: #438df3
</style>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { omitLocale } from '../shared/route'

const route = useRoute()
const i18n = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function activeClass(name: string) {
  return omitLocale(route.path, i18n.locale.value).startsWith(`/${name}`)
    ? {
      'ivu-menu-item-active': true,
      'ivu-menu-item-selected': true
    }
    : {}
}

const localePath = useLocalePath()
</script>
