/**
  {
    "api": 1,
    "name": "Generate CSP Header",
    "description": "Generate Content Security Policy header template",
    "author": "Boop",
    "icon": "lock",
    "tags": "csp,security,header,web"
  }
**/

function main(state) {
  const mode = state.text.trim().toLowerCase();

  let csp;

  if (mode === 'strict' || mode === 'production') {
    csp = `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self';`;
  } else if (mode === 'development' || mode === 'dev') {
    csp = `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' ws: wss:;`;
  } else {
    csp = `Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self'; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests;`;
  }

  const explanation = `

# CSP Directives Explained:
- default-src: Fallback for other directives
- script-src: JavaScript sources
- style-src: CSS sources
- img-src: Image sources
- font-src: Font sources
- connect-src: AJAX, WebSocket, EventSource
- frame-ancestors: Embedding in frames
- base-uri: <base> tag URLs
- form-action: Form submission targets

# Common values:
- 'self': Same origin only
- 'none': Block all
- 'unsafe-inline': Allow inline scripts/styles (avoid in production)
- 'unsafe-eval': Allow eval() (avoid in production)
- https:: Allow any HTTPS source
- data:: Allow data: URIs`;

  state.text = csp + explanation;
  state.postInfo("Generated CSP header");
}
