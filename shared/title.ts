import { useI18n } from 'vue-i18n';

export function alterTitle(key?: string) {
  const { t } = useI18n();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useHead({
    titleTemplate(title) {
      return title ? [key ? t(key, { title }) : title, t('name')].join(' - ') : t('name');
    },
  });
}
