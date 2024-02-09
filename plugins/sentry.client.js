import { dsn } from '../config/sentry';

// eslint-disable-next-line no-undef
export default defineNuxtPlugin(async (nuxtApp) => {
  const app = nuxtApp.vueApp;

  const { BrowserTracing } = await import('@sentry/browser');
  const Sentry = await import('@sentry/vue');

  Sentry.init({
    app,
    dsn,
    environment: window.location.hostname === 'localhost' ? 'localhost' : 'production',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(nuxtApp.$router),
        tracePropagationTargets: ['localhost', 'rete.js.org', /^\//],
      }),
      new Sentry.BrowserProfilingIntegration(),
      Sentry.replayIntegration(),
    ],
    replaysSessionSampleRate: 0.25,
    replaysOnErrorSampleRate: 1.0,
    tracesSampleRate: 1.0,
  });
});
