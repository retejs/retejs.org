import { useHead } from '#imports'
import { useI18n } from 'vue-i18n'

export function seoLang() {
  const { locale } = useI18n()

  useHead({
    htmlAttrs: {
      lang: locale
    }
  })
}
