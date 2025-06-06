<template lang="pug">
.search
  client-only
    div(ref="container")
    template(#placeholder)
      SkeletonItem.skeleton(
        animated
        type="rect"
      )
</template>

<script setup lang="ts">
import '@docsearch/css'
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const appId = '47GZKZVKVE'
const indexName = 'retejs'
const apiKey = 'ab7a7d6c6c64359b03362fbbcf3d5135'

const container = ref<HTMLElement | null>(null)

const { locale, t } = useI18n()

const refresh = async () => {
  if (!container.value) return

  const { default: docsearch } = await import('@docsearch/js')

  docsearch({
    container: container.value,
    appId,
    indexName,
    apiKey,
    // @ts-ignore
    searchParameters: {
      facetFilters: [`lang:${locale.value}`],
    },
    placeholder: t('docsearch.placeholder'),
    translations: {
      button: {
        buttonText: t('docsearch.button.buttonText'),
        buttonAriaLabel: t('docsearch.button.buttonAriaLabel')
      },
      modal: {
        searchBox: {
          resetButtonTitle: t('docsearch.modal.searchBox.resetButtonTitle'),
          resetButtonAriaLabel: t('docsearch.modal.searchBox.resetButtonAriaLabel'),
          cancelButtonText: t('docsearch.modal.searchBox.cancelButtonText'),
          cancelButtonAriaLabel: t('docsearch.modal.searchBox.cancelButtonAriaLabel')
        },
        startScreen: {
          recentSearchesTitle: t('docsearch.modal.startScreen.recentSearchesTitle'),
          noRecentSearchesText: t('docsearch.modal.startScreen.noRecentSearchesText'),
          saveRecentSearchButtonTitle: t('docsearch.modal.startScreen.saveRecentSearchButtonTitle'),
          removeRecentSearchButtonTitle: t('docsearch.modal.startScreen.removeRecentSearchButtonTitle'),
          favoriteSearchesTitle: t('docsearch.modal.startScreen.favoriteSearchesTitle'),
          removeFavoriteSearchButtonTitle: t('docsearch.modal.startScreen.removeFavoriteSearchButtonTitle')
        },
        errorScreen: {
          titleText: t('docsearch.modal.errorScreen.titleText'),
          helpText: t('docsearch.modal.errorScreen.helpText')
        },
        footer: {
          selectText: t('docsearch.modal.footer.selectText'),
          selectKeyAriaLabel: t('docsearch.modal.footer.selectKeyAriaLabel'),
          navigateText: t('docsearch.modal.footer.navigateText'),
          navigateUpKeyAriaLabel: t('docsearch.modal.footer.navigateUpKeyAriaLabel'),
          navigateDownKeyAriaLabel: t('docsearch.modal.footer.navigateDownKeyAriaLabel'),
          closeText: t('docsearch.modal.footer.closeText'),
          closeKeyAriaLabel: t('docsearch.modal.footer.closeKeyAriaLabel'),
          searchByText: t('docsearch.modal.footer.searchByText')
        },
        noResultsScreen: {
          noResultsText: t('docsearch.modal.noResultsScreen.noResultsText'),
          suggestedQueryText: t('docsearch.modal.noResultsScreen.suggestedQueryText'),
          reportMissingResultsText: t('docsearch.modal.noResultsScreen.reportMissingResultsText'),
          reportMissingResultsLinkText: t('docsearch.modal.noResultsScreen.reportMissingResultsLinkText')
        }
      }
    }
  })
}

watch(locale, () => {
  void refresh()
})

watch(container, () => {
  void refresh()
}, { immediate: true })

onMounted(() => {
  void refresh()
})
</script>

<style lang="sass">
:root
  --docsearch-primary-color: #ffd92c
  --docsearch-highlight-color: #8ba0ff

.search
  .skeleton
    width: 100%
    vertical-align: middle

.DocSearch-Button
  border: 1px solid #dcdee2
  border-radius: 4px
  background: white
  height: 32px
  display: inline-flex
  vertical-align: middle
  flex-direction: row-reverse
  width: 100%
  margin: 0

.DocSearch-Button-Keys
  transform: scale(0.7)
  transform-origin: 0

.DocSearch-Button-Placeholder
  display: none

.DocSearch-Search-Icon
  --docsearch-text-color: grey
  transform: scale(0.6)

</style>
