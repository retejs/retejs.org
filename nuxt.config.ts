/// <reference types="nuxt" />
import { resolve } from 'path';
import { isCI, isDevelopment } from 'std-env';
import { splitVendorChunkPlugin } from 'vite';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src',
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    'nuxt-purgecss',
    '@vite-pwa/nuxt',
    '@nuxt/icon',
    '@nuxtjs/sitemap',
    'nuxt-llms'
  ],
  telemetry: false,
  css: [
    '~/assets/styles/global.css',
    resolve(__dirname, 'node_modules/view-ui-plus-es/dist/styles/viewuiplus.css'),
  ],
  typescript: {
    typeCheck: true,
    includeWorkspace: true,
  },
  llms: {
    domain: 'https://retejs.org',
    title: 'Rete.js Documentation',
    sections: [],
    full: {
      title: 'Rete.js Full Documentation',
      description: 'Complete documentation for Rete.js - a modular framework for visual programming'
    }
  },
  site: {
    url: 'https://retejs.org',
    name: 'Rete.js'
  },
  vite: {
    plugins: [
      splitVendorChunkPlugin(),
    ],
    build: {
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (id.endsWith('.css') || id.includes('&lang.sass') || id.includes('&lang.scss') || id.includes('&lang.css')) {
              return 'styles';
            }

            return 'app';
          },
        },
      },
    },
  },
  imports: {
    autoImport: false
  },
  content: {
    build: {
      transformers: [
        './typedoc/transformer.ts',
      ],
      markdown: {
        highlight: {
          theme: 'one-dark-pro',
        },
        remarkPlugins: {
          'remark-heading-id': {}
        }
      }
    },
  },
  purgecss: {
    enabled: !isDevelopment,
    safelist: [
      /^(?!ivu-calendar|ivu-avatar|vu-auth|ivu-space|ivu-cascader|ivu-transfer|ivu-arti|ivu-table|ivu-col-|ivu-tabs|ivu-rate|ivu-select-item-selected).*$/,
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
  },
  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      title: 'Rete.js',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        {
          rel: 'preload', href: '/fonts/Ubuntu-Regular.woff2', as: 'font', type: 'font/woff2', crossorigin: '',
        },
        {
          rel: 'preload', href: '/fonts/Ubuntu-Bold.woff2', as: 'font', type: 'font/woff2', crossorigin: '',
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