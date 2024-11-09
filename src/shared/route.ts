import { useI18n } from 'vue-i18n'

export function omitLocale(path: string, locale: string) {
  return path.replace(new RegExp(`^/${locale}`), '')
}

export function usePathSanitizer() {
  const { locale } = useI18n()
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const localePath = useLocalePath()

  return {
    sanitize(path: string) {
      return localePath(omitLocale(path, locale.value))
    }
  }
}
