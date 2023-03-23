<template lang="pug">
.notice
  | {{ $t('currentVersionNotice.youAreBrowsing') }}
  | {{ $t('currentVersionNotice.checkOut') }}
  | !{' '}
  a(href="https://rete.js.org" target="_blank") {{ $t('currentVersionNotice.docsV1') }}
  | {{ $t('currentVersionNotice.orGetStarted' )}}
</template>

<style lang="sass" scoped>
.notice
  width: 100%
  background: #697984
  color: white
  padding: 0.2em
  text-align: center
  font-weight: 100
  font-size: 0.9rem
  a
    color: wheat
</style>
