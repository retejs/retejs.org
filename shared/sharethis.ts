export function useShareThis() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useHead({
    script: [
      {
        src: 'https://platform-api.sharethis.com/js/sharethis.js#property=644c11c3ac242f001bf9c4da&product=image-share-buttons',
        async: true,
      },
    ],
  });
}
