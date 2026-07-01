import * as Sentry from '@sentry/nextjs';
import { initBotId } from 'botid/client/core';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  sendDefaultPii: false,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  replaysSessionSampleRate: process.env.NODE_ENV === 'development' ? 0.1 : 0.02,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
  integrations: [Sentry.replayIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

initBotId({
  protect: [
    { path: '/api/email/send', method: 'POST' },
    { path: '/api/email/retry', method: 'POST' },
    { path: '/api/email/test', method: 'POST' },
  ],
});
