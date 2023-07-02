<template lang="pug">
.menu-items
  MenuItem(name="docs", :to="localePath('/docs/')") {{ $t('docs') }}
  MenuItem(name="examples", :to="localePath('/examples')") {{ $t('examples') }}
  MenuItem.highlight(name="studio", target="_blank", to="https://studio.retejs.org") Studio
  MenuItem(name="sponsor", :to="localePath('/sponsor')") {{ $t('sponsor') }}
</template>

<style lang="sass" scoped>
.menu-items
  white-space: nowrap
  .highlight
    color: #438df3
</style>
