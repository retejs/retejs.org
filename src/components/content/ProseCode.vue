<template lang="pug">
code.block
  slot
</template>

<style lang="sass" scoped>
@import '@/assets/styles/vars.sass'

code
  padding: 0.1em 0.5em
  margin: 0.5em 0
  border-radius: 1em
  background: $code-background
  font-size: 0.9em
  color: $code-foreround
  overflow: auto
.block > pre
  background: transparent
pre code
  display: block
  padding: 1em
  .line
    display: block
    min-height: 1rem
    width: fit-content
</style>
