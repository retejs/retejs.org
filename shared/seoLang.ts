import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';

export function seoLang() {
  const { locale } = useI18n();

  useHead({
    htmlAttrs: {
      lang: locale,
    },
  });
}
