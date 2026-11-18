import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  sendDefaultPii: false,
  tracesSampleRate: process.env.NODE_ENV === 'development' ? 1.0 : 0.1,
  environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
  release: process.env.SENTRY_RELEASE ?? process.env.VERCEL_GIT_COMMIT_SHA,
  enableLogs: true,
  initialScope: {
    tags: {
      app: 'jarrettstanleycom',
      'site.family': 'jarrettstanleycom',
      runtime: 'nodejs',
      'site.name': 'jarrettstanleycom',
    },
  },
});
