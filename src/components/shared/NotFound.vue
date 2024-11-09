<template lang="pug">
.not-found
  .center
    .block
      .title Oops!
      .subtitle We couldn't find the page you were looking for.
      .standalone(v-if="standalone")
        .home
          Logo.logo(:hover="true")
          span.name Rete.js
        Search.search
</template>

<script setup lang="ts">
defineProps({
  standalone: {
    type: Boolean,
    default: true
  }
})

</script>

<style lang="sass" scoped>
.not-found
  width: 100%
  height: 100%
  .center
    width: 100%
    min-height: 100%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    gap: 2em
    padding: 4em
  .block
    max-width: 40em
  .title
    text-align: center
    font-size: 3rem
    font-weight: 500
    color: #aaa
    margin: 0
    padding: 0
    line-height: 1.5
    white-space: nowrap

  .subtitle
    font-size: 1.2rem
    font-weight: 400
    color: #aaa
    text-align: center
    margin: 0
    padding: 0
    line-height: 1.5

  .standalone
    display: flex
    flex-direction: row
    align-items: center
    justify-content: center
    gap: 1em
    margin-top: 2em
    .home
      cursor: pointer
      & > *
        vertical-align: middle
      &:hover .name
        color: #2d8cf0
      .logo
        width: 50px
        height: 50px
      .name
        font-size: 20px
        color: #515a6e
        white-space: nowrap
    .search:not(:empty)
      min-width: 12em
</style>
