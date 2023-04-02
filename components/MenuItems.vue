<template lang="pug">
.menu-items
  MenuItem(name="docs", :to="localePath('/docs/')") {{ $t('docs') }}
  MenuItem(name="examples", :to="localePath('/examples')") {{ $t('examples') }}
  MenuItem(name="sponsor", :to="localePath('/sponsor')") {{ $t('sponsor') }}
</template>

<style lang="sass" scoped>
.menu-items
  white-space: nowrap
</style>
