import 'react'

/**
 * WebMCP tool attributes (W3C draft). They annotate a server-rendered form with
 * the tool it represents, so an in-page agent can act on it without inferring
 * intent from the markup.
 */
declare module 'react' {
  interface HTMLAttributes<T> {
    toolname?: string
    tooldescription?: string
  }
}
