import * as Sentry from '@sentry/nextjs';
import { initBotId } from 'botid/client/core';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  sendDefaultPii: false,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  replaysSessionSampleRate: process.env.NODE_ENV === 'development' ? 0.1 : 0.02,
  replaysOnErrorSampleRate: 1.0,
  enableLogs: true,
  initialScope: {
    tags: {
      app: 'jarrettstanleycom',
      'site.family': 'jarrettstanleycom',
      runtime: 'browser',
      'site.name': 'jarrettstanleycom',
    },
  },
  beforeSend(event) {
    if (typeof window !== 'undefined') {
      event.tags = {
        ...event.tags,
        'site.hostname': window.location.hostname,
        'site.path': window.location.pathname,
      };
    }

    return event;
  },
  integrations: [Sentry.replayIntegration()],
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

initBotId({
  protect: [
    { path: '/api/contact', method: 'POST' },
    { path: '/api/contact/media', method: 'POST' },
    { path: '/api/consulting', method: 'POST' },
    { path: '/api/speaking', method: 'POST' },
    { path: '/api/newsletter', method: 'POST' },
    { path: '/api/resources/track-download', method: 'POST' },
    { path: '/api/email/send', method: 'POST' },
    { path: '/api/email/retry', method: 'POST' },
    { path: '/api/email/test', method: 'POST' },
  ],
});
