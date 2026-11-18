'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: '100vh',
            display: 'grid',
            placeItems: 'center',
            padding: '2rem',
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          <section style={{ maxWidth: '32rem', textAlign: 'center' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong</h1>
            <p style={{ color: '#52525b', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              The page hit an unexpected error. Please try again or return home.
            </p>
            <button
              onClick={reset}
              style={{
                border: 0,
                borderRadius: '0.5rem',
                background: '#111827',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                padding: '0.75rem 1rem',
              }}
            >
              Try again
            </button>
          </section>
        </main>
      </body>
    </html>
  );
}
