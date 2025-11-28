/**
  {
    "api": 1,
    "name": "HTTP Header Parser",
    "description": "Parse and format HTTP headers",
    "author": "Boop",
    "icon": "arrow.up.arrow.down",
    "tags": "http,header,parse,format,web"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const headers = {};
    const result = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const colonIndex = trimmed.indexOf(':');
      if (colonIndex === -1) continue;

      const name = trimmed.substring(0, colonIndex).trim();
      const value = trimmed.substring(colonIndex + 1).trim();

      headers[name] = value;
    }

    // Format headers
    result.push('HTTP Headers:');
    result.push('');

    for (const [name, value] of Object.entries(headers)) {
      result.push(`${name}: ${value}`);
    }

    // Add analysis
    result.push('');
    result.push('Analysis:');

    if (headers['Content-Type']) {
      result.push(`Content Type: ${headers['Content-Type']}`);
    }

    if (headers['Content-Length']) {
      result.push(`Content Length: ${headers['Content-Length']} bytes`);
    }

    if (headers['Cache-Control']) {
      result.push(`Caching: ${headers['Cache-Control']}`);
    }

    const securityHeaders = ['Strict-Transport-Security', 'Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options'];
    const presentSecurity = securityHeaders.filter(h => headers[h]);

    if (presentSecurity.length > 0) {
      result.push(`Security Headers: ${presentSecurity.length}/${securityHeaders.length}`);
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error parsing HTTP headers: " + error.message);
  }
}
