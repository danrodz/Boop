/**
  {
    "api": 1,
    "name": "URL Analyzer",
    "description": "Parse and analyze URL components",
    "author": "Boop",
    "icon": "link.circle",
    "tags": "url,parse,analyze,query"
  }
**/

function main(state) {
  try {
    const url = state.text.trim();

    // Manual URL parsing for better control
    const urlRegex = /^(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*)(?:\?([^#]*))?(?:#(.*))?/;
    const match = url.match(urlRegex);

    if (!match) {
      state.postError("Invalid URL format");
      return;
    }

    const protocol = match[1] || '';
    const authority = match[2] || '';
    const path = match[3] || '';
    const query = match[4] || '';
    const fragment = match[5] || '';

    // Parse authority (user:pass@host:port)
    let username = '', password = '', hostname = '', port = '';

    if (authority) {
      const authMatch = authority.match(/^(?:([^:@]+)(?::([^@]+))?@)?([^:]+)(?::(\d+))?$/);
      if (authMatch) {
        username = authMatch[1] || '';
        password = authMatch[2] || '';
        hostname = authMatch[3] || '';
        port = authMatch[4] || '';
      }
    }

    // Parse query parameters
    const params = {};
    if (query) {
      query.split('&').forEach(param => {
        const [key, value] = param.split('=');
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      });
    }

    let result = `=== URL ANALYSIS ===\n\n`;
    result += `Original URL:\n${url}\n\n`;

    result += `=== COMPONENTS ===\n`;
    if (protocol) result += `Protocol: ${protocol}\n`;
    if (hostname) result += `Hostname: ${hostname}\n`;
    if (port) result += `Port: ${port}\n`;
    if (username) result += `Username: ${username}\n`;
    if (password) result += `Password: ${'*'.repeat(password.length)}\n`;
    if (path) result += `Path: ${path}\n`;
    if (fragment) result += `Fragment: ${fragment}\n`;

    result += `\n=== QUERY PARAMETERS (${Object.keys(params).length}) ===\n`;

    if (Object.keys(params).length > 0) {
      for (let key in params) {
        result += `${key} = ${params[key]}\n`;
      }
    } else {
      result += 'No query parameters\n';
    }

    // Path analysis
    const pathSegments = path.split('/').filter(s => s);
    result += `\n=== PATH SEGMENTS (${pathSegments.length}) ===\n`;
    pathSegments.forEach((seg, i) => {
      result += `[${i}] ${seg}\n`;
    });

    // Security checks
    result += `\n=== SECURITY CHECKS ===\n`;
    result += protocol === 'https' ? '✓ Uses HTTPS\n' : '⚠️  Not using HTTPS\n';
    result += password ? '⚠️  Password in URL (security risk)\n' : '✓ No password in URL\n';

    const suspiciousChars = url.match(/[<>'"(){}]/g);
    if (suspiciousChars) {
      result += `⚠️  Contains suspicious characters: ${suspiciousChars.join(', ')}\n`;
    } else {
      result += '✓ No suspicious characters\n';
    }

    state.text = result;
  } catch (error) {
    state.postError("URL analysis failed: " + error.message);
  }
}
