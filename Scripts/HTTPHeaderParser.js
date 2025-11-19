/**
  {
    "api": 1,
    "name": "HTTP Header Parser",
    "description": "Parse and analyze HTTP headers",
    "author": "Boop",
    "icon": "network",
    "tags": "http,headers,parse,analyze"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const lines = text.split('\n');
    const headers = {};
    let requestLine = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (i === 0 && (line.startsWith('HTTP/') || /^(GET|POST|PUT|DELETE|PATCH|HEAD|OPTIONS)\s/.test(line))) {
        requestLine = line;
        continue;
      }

      if (line === '') continue;

      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        headers[key] = value;
      }
    }

    let result = `=== HTTP HEADER ANALYSIS ===\n\n`;

    if (requestLine) {
      result += `Request/Response Line:\n${requestLine}\n\n`;
    }

    result += `=== HEADERS (${Object.keys(headers).length}) ===\n\n`;

    // Categorize headers
    const categories = {
      'General': ['Cache-Control', 'Connection', 'Date', 'Pragma', 'Trailer', 'Transfer-Encoding', 'Upgrade', 'Via', 'Warning'],
      'Request': ['Accept', 'Accept-Charset', 'Accept-Encoding', 'Accept-Language', 'Authorization', 'Cookie', 'Host', 'Referer', 'User-Agent'],
      'Response': ['Age', 'ETag', 'Location', 'Server', 'Set-Cookie', 'WWW-Authenticate'],
      'Entity': ['Allow', 'Content-Encoding', 'Content-Language', 'Content-Length', 'Content-Location', 'Content-MD5', 'Content-Range', 'Content-Type', 'Expires', 'Last-Modified'],
      'Security': ['Content-Security-Policy', 'Strict-Transport-Security', 'X-Frame-Options', 'X-Content-Type-Options', 'X-XSS-Protection'],
      'CORS': ['Access-Control-Allow-Origin', 'Access-Control-Allow-Methods', 'Access-Control-Allow-Headers', 'Access-Control-Max-Age']
    };

    for (let category in categories) {
      const categoryHeaders = categories[category];
      const found = Object.keys(headers).filter(h => categoryHeaders.includes(h));

      if (found.length > 0) {
        result += `--- ${category} Headers ---\n`;
        found.forEach(h => {
          result += `${h}: ${headers[h]}\n`;
          delete headers[h];
        });
        result += '\n';
      }
    }

    // Show remaining headers
    const remaining = Object.keys(headers);
    if (remaining.length > 0) {
      result += `--- Other Headers ---\n`;
      remaining.forEach(h => {
        result += `${h}: ${headers[h]}\n`;
      });
      result += '\n';
    }

    // Security analysis
    result += `=== SECURITY ANALYSIS ===\n`;
    const hasHSTS = 'Strict-Transport-Security' in headers || 'strict-transport-security' in headers;
    const hasCSP = 'Content-Security-Policy' in headers || 'content-security-policy' in headers;
    const hasXFrame = 'X-Frame-Options' in headers || 'x-frame-options' in headers;

    result += hasHSTS ? '✓ HSTS enabled\n' : '⚠️  HSTS not set\n';
    result += hasCSP ? '✓ CSP configured\n' : '⚠️  CSP not set\n';
    result += hasXFrame ? '✓ X-Frame-Options set\n' : '⚠️  X-Frame-Options not set\n';

    state.text = result;
  } catch (error) {
    state.postError("Header parsing failed: " + error.message);
  }
}
