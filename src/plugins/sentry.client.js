import {
  init, browserTracingIntegration, BrowserProfilingIntegration, replayIntegration
} from "@sentry/vue";
import {dsn} from "../config/sentry";

// eslint-disable-next-line no-undef
export default defineNuxtPlugin(async (nuxtApp) => {

  const app = nuxtApp.vueApp;

  init({
    app,
    dsn,
    "environment": window.location.hostname === "localhost"
      ? "localhost"
      : "production",
    "integrations": [
      browserTracingIntegration({
        "router": nuxtApp.$router,
        "tracePropagationTargets": [
          "localhost",
          "rete.js.org",
          /^\//
        ]
      }),
      new BrowserProfilingIntegration(),
      replayIntegration()
    ],
    "replaysSessionSampleRate": 0.5,
    "replaysOnErrorSampleRate": 1.0,
    "tracesSampleRate": 1.0,
    "profilesSampleRate": 1.0
  });

});
