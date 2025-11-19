/**
  {
    "api": 1,
    "name": "Generate REST Client",
    "description": "Generate curl command from endpoint description (format: METHOD /path)",
    "author": "Boop",
    "icon": "network",
    "tags": "rest,api,curl,http,client"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');
    const results = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      const parts = trimmed.split(/\s+/);
      if (parts.length < 2) continue;

      const method = parts[0].toUpperCase();
      const path = parts[1];
      const baseUrl = parts[2] || 'http://localhost:3000';

      let curl = `curl -X ${method} "${baseUrl}${path}"`;

      if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
        curl += ' \\\n  -H "Content-Type: application/json" \\\n  -d \'{"key": "value"}\'';
      }

      results.push(curl);
    }

    state.text = results.join('\n\n');
  } catch (error) {
    state.postError("Error generating REST client: " + error.message);
  }
}
