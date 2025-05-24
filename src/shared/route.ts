import { useLocalePath } from '#imports'
import { useI18n } from 'vue-i18n'

export function omitLocale(path: string, locale: string) {
  return path.replace(new RegExp(`^/${locale}`), '')
}

export function usePathSanitizer() {
  const { locale } = useI18n()

  const localePath = useLocalePath()

  return {
    sanitize(path: string) {
      return localePath(omitLocale(path, locale.value))
    }
  }
}
