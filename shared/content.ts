import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { omitLocale } from './route';

export function useContentPath() {
  const route = useRoute();
  const i18n = useI18n();

  return computed(() => `/${i18n.locale.value}${omitLocale(route.path, i18n.locale.value)}`);
}
