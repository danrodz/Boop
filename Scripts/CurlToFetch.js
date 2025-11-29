/**
  {
    "api": 1,
    "name": "cURL to Fetch",
    "description": "Convert cURL command to JavaScript fetch() call",
    "author": "Boop",
    "icon": "code",
    "tags": "curl,fetch,javascript,api,convert"
  }
**/

function main(state) {
  const curl = state.text.trim();

  // Extract URL
  const urlMatch = curl.match(/curl\s+['"]?([^'">\s]+)['"]?/);
  if (!urlMatch) {
    state.postError("Could not find URL in cURL command");
    return;
  }
  const url = urlMatch[1];

  // Extract method
  const methodMatch = curl.match(/-X\s+(\w+)/);
  const method = methodMatch ? methodMatch[1] : 'GET';

  // Extract headers
  const headers = {};
  const headerRegex = /-H\s+['"]([^:]+):\s*([^'"]+)['"]/g;
  let headerMatch;
  while ((headerMatch = headerRegex.exec(curl)) !== null) {
    headers[headerMatch[1]] = headerMatch[2];
  }

  // Extract body
  const bodyMatch = curl.match(/--data(?:-raw)?\s+['"]([^'"]+)['"]/);
  const body = bodyMatch ? bodyMatch[1] : null;

  // Generate fetch code
  let fetchCode = `fetch('${url}', {\n  method: '${method}'`;

  if (Object.keys(headers).length > 0) {
    fetchCode += `,\n  headers: ${JSON.stringify(headers, null, 4).replace(/^/gm, '  ')}`;
  }

  if (body) {
    fetchCode += `,\n  body: '${body}'`;
  }

  fetchCode += '\n})\n  .then(res => res.json())\n  .then(data => console.log(data));';

  state.text = fetchCode;
  state.postInfo("Converted cURL to fetch");
}
