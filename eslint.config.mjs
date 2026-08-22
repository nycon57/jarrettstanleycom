import nextConfig from 'eslint-config-next/core-web-vitals'
import nextTypescriptConfig from 'eslint-config-next/typescript'

/**
 * Flat config. `next lint` was removed in Next.js 16, so ESLint runs directly
 * through the CLI (`npm run lint`).
 *
 * https://nextjs.org/docs/app/api-reference/config/eslint
 *
 * This codebase had no ESLint config at all before Next 16 removed the
 * command, so the first run surfaced ~270 pre-existing findings. Rules that
 * flag genuine defects stay at `error` and gate the build. Rules covering
 * accumulated debt or a deliberate pattern are set to `warn` below, each with
 * the reason — they still print on every run, they just do not block.
 */
const eslintConfig = [
  {
    ignores: [
      '.next/**',
      '.vercel/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'tsconfig.tsbuildinfo',
    ],
  },
  ...nextConfig,
  ...nextTypescriptConfig,
  {
    rules: {
      // Apostrophes and quotes in marketing prose. Escaping them would make the
      // copy harder to edit for no reader-facing benefit.
      'react/no-unescaped-entities': 'warn',

      // Pre-existing `any` usage, mostly in analytics and email plumbing.
      // Tracked as debt rather than a merge blocker.
      '@typescript-eslint/no-explicit-any': 'warn',

      // Reading browser-only state (URL params, consent cookies) on mount is
      // the SSR-safe way to do it in this app; a lazy initializer would
      // hydrate against server state that does not have the value.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
  {
    // Config files are CommonJS or load plugins by require, which is the
    // supported way to write them.
    files: ['*.config.js', '*.config.ts', '*.config.mjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    // Email templates are pulled in with inline `require()` so the module
    // graph stays lazy. Worth converting to static imports, but that touches
    // live sending paths and belongs in its own change.
    files: ['src/lib/email.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'warn',
    },
  },
]

export default eslintConfig
