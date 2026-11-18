import * as Sentry from '@sentry/nextjs';

type RequestInfo = {
  path: string;
  method: string;
  headers: Record<string, string | string[] | undefined>;
};

type ErrorContext = {
  routerKind: string;
  routePath: string;
  routeType: string;
};

function getHeaderValue(
  headers: Record<string, string | string[] | undefined>,
  key: string,
) {
  const value = headers[key];
  return Array.isArray(value) ? value[0] : value;
}

function getRequestHostname(headers: Record<string, string | string[] | undefined>) {
  return (
    getHeaderValue(headers, 'host') ||
    getHeaderValue(headers, 'x-forwarded-host') ||
    'unknown'
  ).split(':')[0].toLowerCase();
}

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config');
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config');
  }
}

export function onRequestError(
  error: unknown,
  request: RequestInfo,
  context: ErrorContext,
) {
  Sentry.withScope((scope) => {
    const hostname = getRequestHostname(request.headers);

    scope.setTag('request.method', request.method);
    scope.setTag('request.path', request.path);
    scope.setTag('route.path', context.routePath);
    scope.setTag('route.type', context.routeType);
    scope.setTag('site.hostname', hostname);
    scope.setTag('site.name', 'jarrettstanleycom');
    scope.setContext('next.request', {
      routerKind: context.routerKind,
      routePath: context.routePath,
      routeType: context.routeType,
      method: request.method,
      path: request.path,
    });

    Sentry.captureRequestError(error, request, context);
  });
}
