<template lang="pug">
table
  thead
    tr
      th(rowspan="2") {{ title }}
      th.center(v-for="stack in stacks" :colspan="stack.versions?.length") {{ stack.name }}
    tr
      template(v-for="stack in stacks")
        th.center(v-for="(version, i) in stack.versions" :class="cellClasses(stack, i)") {{ version }}
  tbody
    tr(v-for="browser in browsers")
      td {{ browser }}
      template(v-for="stack in stacks", :key="stack.name")
        template(v-for="(version, i) in getVersions(stack, browser)" :key="version.value")
          td.center(:class="{...cellClasses(stack, i), warning: version.warning }")
            Tooltip(placement="top", :disabled="!version.warning" :content="version.warning?.text") ✔
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

type Browser = string
type Version = string | number
type Stack = {
  name: string
  browser?: string
  versions: Version[]
  warnings?: {
    browser: string
    version: Version
    text: string
  }[]
}
type Props = {
  title: string
  stacks: Stack[]
  browsers: Browser[]
}

defineProps<Props>()

function cellClasses(stack: Stack, index: number) {
  return {
    first: index === 0,
    last: stack.versions.length - 1 === index
  }
}

function getVersions(stack: Stack, browser: Browser) {
  return stack.versions.map(version => {
    const warning = stack.warnings?.find(warn => {
      return warn.browser.split(',').includes(browser) && warn.version === version
    })

    return { value: version, warning }
  })
}

</script>

<style lang="sass" scoped>
.center
  text-align: center
.first
  padding-left: 1em
.last
  padding-right: 1em
.warning
  color: #ffaa2a
</style>
