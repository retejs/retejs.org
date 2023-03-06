import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';

export function alterTitle(key?: string) {
  const { t } = useI18n();

  useHead({
    titleTemplate(title) {
      return title ? [key ? t(key, { title }) : title, t('name')].join(' - ') : t('name');
    },
  });
}
