/// <reference types="nuxt" />
import { isCI, isDevelopment } from 'std-env';
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
    'nuxt-gtag',
  ],
  telemetry: false,
  css: [
    '~/assets/styles/global.css',
    'view-ui-plus/dist/styles/viewuiplus.css',
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
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ]
    },
  },
  pwa: {
    mode: isCI ? 'production' : 'development',
    disable: isDevelopment,
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
  gtag: {
    id: 'G-Q0DXJPL3FX',
  },
});
