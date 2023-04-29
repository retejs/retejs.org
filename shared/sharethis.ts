import {
  reactive, provide, inject, onUnmounted, onMounted, ref, computed,
} from 'vue';

export const key = Symbol('sharethis-di-key');

export function provideShareThis() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useHead({
    script: [
      {
        src: 'https://platform-api.sharethis.com/js/sharethis.js#property=644c11c3ac242f001bf9c4da',
        async: true,
      },
    ],
  });

  const consumers = ref(0);

  const data = reactive({
    consumers,
    visible: computed(() => consumers.value > 0),
    data: {
      // 'data-title': 'title',
      // 'data-message': 'message',
      // 'data-description': 'description'
    },
  });

  provide(key, data);

  return data;
}

export function useShareThis() {
  const sharethis: any = inject(key);

  onMounted(() => {
    sharethis.consumers++;
  });
  onUnmounted(() => {
    sharethis.consumers--;
  });
}
