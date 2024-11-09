import { useI18n } from 'vue-i18n'

export function seoLang() {
  const { locale } = useI18n()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useHead({
    htmlAttrs: {
      lang: locale
    }
  })
}
