import { computed, watch } from 'vue';
import { useRoute } from 'vue-router';

export function useShareThis(routes: string[]) {
  const route = useRoute();
  const match = (path: string) => routes.some((r) => path.startsWith(r));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useHead({
    script: computed(() => (match(route.path) ? [
      {
        src: 'https://platform-api.sharethis.com/js/sharethis.js#property=644c11c3ac242f001bf9c4da',
        async: true,
      },
    ] : [])),
  });

  watch(route, () => {
    if (!match(route.path)) {
      console.log('remove');
      document.querySelector('.st-sticky-share-buttons')?.remove();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line no-underscore-dangle
      window.__sharethis__ = null;
    }
  });
}
