<template lang="pug">
.lang
  client-only
    Select.select.upper(
      :model-value="$i18n.locale"
      @on-change="setLocale($event)"
      size="small"
    )
      Option.upper(v-for="lang in $i18n.locales" :value="lang.code" :key="lang.code")
        | {{lang.code}}
    template(#placeholder)
      SsrSelect {{ $i18n.locale }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import SsrSelect from './ssr/SsrSelect.vue'

export default defineComponent({
  methods: {
    setLocale(lang) {
      this.$router.push(this.switchLocalePath(lang))
    }
  },
  components: {
    SsrSelect
  }
})
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
