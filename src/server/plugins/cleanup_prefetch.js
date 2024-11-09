// remove unnecessary script and assets from /preview/ pages

// eslint-disable-next-line no-undef
export default defineNitroPlugin((nitroApp) => {

  nitroApp.hooks.hook(
    "render:html",
    (html) => {

      html.head = html.head.map((chunk) => {

        const lines = chunk.split("\n");
        const preloadRegexp = /^<link rel="(modulepreload|prefetch|preload)" as="script".*?>/;
        const iconsRegexp = /^<link rel="prefetch" as="image" type="image\/svg\+xml" href="\/_nuxt\/ionicons.*?>$/;

        return lines.
          filter((line) => !line.match(preloadRegexp) && !line.match(iconsRegexp)).
          join("\n");

      });

    }
  );

});
