import { resolve } from 'path';
import { defineNuxtModule } from '@nuxt/kit';

export default defineNuxtModule({
  setup(_options, nuxt) {
    nuxt.options.nitro.externals = nuxt.options.nitro.externals || {};
    nuxt.options.nitro.externals.inline = nuxt.options.nitro.externals.inline || [];
    nuxt.options.nitro.externals.inline.push(resolve(__dirname, './index.ts'));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    nuxt.hook('content:context', (contentContext) => {
      contentContext.transformers.push(resolve(__dirname, './transformer.ts'));
    });
  },
});
