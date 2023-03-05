/// <reference types="nuxt" />

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    'nuxt-purgecss',
  ],
  telemetry: false,
  css: [
    'view-ui-plus/dist/styles/viewuiplus.css',
  ],
  content: {
    highlight: {
      theme: 'one-dark-pro',
    },
  },
  purgecss: {
    enabled: true,
    safelist: [
      /^(?!vu-calendar|ivu-avatar|vu-auth|ivu-space|ivu-cascader|ivu-skeleton|ivu-transfer|ivu-arti|ivu-table|ivu-col|ivu-tabs|ivu-rate|ivu-select-item-selected).*$/,
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
    langDir: '/locales',
  },
});
