/**
 * WebMCP: registers this site's read-only tools with an in-page agent through
 * `document.modelContext` (W3C draft; `navigator.modelContext` is the
 * pre-Chrome-150 alias).
 *
 * Rendered as an inline script rather than a React effect so the registration
 * is visible in the server-rendered HTML — agents and scanners should not have
 * to execute a hydrated bundle to discover what this page can do. Every tool
 * proxies to the site's own MCP endpoint at /mcp, so there is exactly one
 * implementation of each tool.
 */

const REGISTRATION_SCRIPT = `(function () {
  var context =
    (typeof document !== 'undefined' && document.modelContext) ||
    (typeof navigator !== 'undefined' && navigator.modelContext);
  if (!context) return;

  function call(name, args) {
    return fetch('/mcp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name: name, arguments: args } })
    })
      .then(function (response) {
        if (!response.ok) throw new Error('MCP endpoint returned HTTP ' + response.status);
        return response.json();
      })
      .then(function (payload) {
        var text =
          (payload && payload.result && payload.result.content && payload.result.content[0] && payload.result.content[0].text) ||
          (payload && payload.error && payload.error.message) ||
          'No result.';
        return { content: [{ type: 'text', text: text }] };
      })
      .catch(function (error) {
        return { content: [{ type: 'text', text: 'Error: ' + error.message }], isError: true };
      });
  }

  var tools = [
    {
      name: 'search_content',
      description:
        "Search everything published on jarrettstanley.com - articles on AI in mortgage marketing, glossary definitions, AI tool roundups, campaign teardowns, role playbooks, and Jarrett Stanley's speaking and consulting pages. Returns ranked matches with snippets and canonical URLs.",
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Search terms, for example "AI lead scoring".' },
          section: { type: 'string', enum: ['all', 'site', 'blog', 'glossary', 'tools', 'examples', 'solutions'], default: 'all' },
          limit: { type: 'integer', minimum: 1, maximum: 25, default: 8 }
        },
        required: ['query']
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
      execute: function (args) { return call('search_content', args); }
    },
    {
      name: 'get_page',
      description:
        'Read the full Markdown text of one page on jarrettstanley.com by its path, for example "/speaking" or "/insights/glossary/ai-lead-scoring".',
      inputSchema: {
        type: 'object',
        properties: { path: { type: 'string', description: 'Site path beginning with "/".' } },
        required: ['path']
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
      execute: function (args) { return call('get_page', args); }
    },
    {
      name: 'list_content',
      description:
        'List every published page in one section of jarrettstanley.com with its title, summary, and canonical URL.',
      inputSchema: {
        type: 'object',
        properties: {
          section: { type: 'string', enum: ['all', 'site', 'blog', 'glossary', 'tools', 'examples', 'solutions'], default: 'all' }
        },
        required: ['section']
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
      execute: function (args) { return call('list_content', args); }
    }
  ];

  try {
    if (typeof context.registerTool === 'function') {
      tools.forEach(function (tool) { context.registerTool(tool); });
    } else if (typeof context.provideContext === 'function') {
      context.provideContext({ tools: tools });
    }
  } catch (error) {
    // A browser that exposes the API but rejects this shape is not a reason to
    // break the page; agents can still call /mcp directly.
  }
})();`

export function WebMcpTools() {
  return (
    <script
      id="webmcp-tools"
      type="text/javascript"
      dangerouslySetInnerHTML={{ __html: REGISTRATION_SCRIPT }}
    />
  )
}
