/// <reference types="nuxt" />
import { isCI, isDevelopment } from 'std-env';
import { version as iViewVersion } from 'view-ui-plus-es/package.json';
import TypeDoc from './typedoc/index.mjs';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    TypeDoc,
    '@nuxt/content',
    '@nuxtjs/i18n',
    'nuxt-purgecss',
    '@vite-pwa/nuxt',
  ],
  telemetry: false,
  css: [
    '~/assets/styles/global.css',
  ],
  content: {
    highlight: {
      theme: 'one-dark-pro',
    },
    markdown: {
      remarkPlugins: ['remark-heading-id'],
    },
  },
  purgecss: {
    enabled: !isDevelopment,
    safelist: [
      /^(?!ivu-calendar|ivu-avatar|vu-auth|ivu-space|ivu-cascader|ivu-skeleton|ivu-transfer|ivu-arti|ivu-table|ivu-col-|ivu-tabs|ivu-rate|ivu-select-item-selected).*$/,
    ],
    fontFace: true,
    keyframes: true,
  },
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'uk', file: 'uk.json' },
    ],
    detectBrowserLanguage: {
      fallbackLocale: 'en',
    },
    lazy: true,
    defaultLocale: 'en',
    langDir: 'locales',
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      title: 'Rete.js',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com/', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400;500;700&display=swap' },
        { rel: 'stylesheet', href: `https://cdn.jsdelivr.net/npm/view-ui-plus@${iViewVersion}/dist/styles/viewuiplus.css` },
        {
          rel: 'preload', href: 'https://fonts.gstatic.com/s/ubuntu/v20/4iCs6KVjbNBYlgoKfw72.woff2', as: 'font', type: 'font/woff2', crossorigin: '',
        },
        {
          rel: 'preload', href: 'https://cdn.jsdelivr.net/npm/view-ui-plus@1.3.16/dist/styles/fonts/ionicons.woff2?v=3.0.0', as: 'font', type: 'font/woff2', crossorigin: '',
        },
        {
          rel: 'preload', href: 'https://fonts.gstatic.com/s/ubuntu/v20/4iCv6KVjbNBYlgoCxCvjsGyN.woff2', as: 'font', type: 'font/woff2', crossorigin: '',
        },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
    },
  },
  features: {
    inlineStyles: false,
  },
  pwa: {
    mode: isCI ? 'production' : 'development',
    disable: true,
    manifest: {
      name: 'Rete.js',
      short_name: 'Rete.js',
      theme_color: '#ffffff',
      icons: [
        {
          src: '192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/404.html',
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.ts',
  },
});
