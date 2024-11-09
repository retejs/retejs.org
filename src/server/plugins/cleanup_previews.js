// remove unnecessary script and assets from /preview/ pages

// eslint-disable-next-line no-undef
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html, { event }) => {
    if (event.node.req.url.match(/^(\/\w+)?\/preview\//)) {
      html.head = html.head.filter((line) => !line.match(/<link rel="(modulepreload|prefetch|preload)".*?>/));
      html.bodyAppend = html.bodyAppend.filter((line) => !line.match(/<script.*?>/));
    }
  });
});
