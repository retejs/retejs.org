import { dsn } from '../config/sentry';

// eslint-disable-next-line no-undef
export default defineNuxtPlugin(async (nuxtApp) => {
  const app = nuxtApp.vueApp;

  const { BrowserTracing } = await import('@sentry/tracing');
  const Sentry = await import('@sentry/vue');

  Sentry.init({
    app,
    dsn,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
        tracePropagationTargets: ['localhost', 'rete.js.org', /^\//],
      }),
    ],
    tracesSampleRate: 1.0, /// process.env.NODE_ENV === 'production'
  });
});
