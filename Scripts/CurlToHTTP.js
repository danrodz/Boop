/**
  {
    "api": 1,
    "name": "Curl to HTTP Request",
    "description": "Convert curl command to raw HTTP request",
    "author": "Boop",
    "icon": "arrow.down.doc",
    "tags": "curl,http,convert,request"
  }
**/

function main(state) {
  try {
    const curl = state.text.trim();

    // Extract URL
    const urlMatch = curl.match(/curl\s+(?:-X\s+\w+\s+)?['"]?(https?:\/\/[^\s'"]+)/);
    if (!urlMatch) {
      state.postError("Could not find URL in curl command");
      return;
    }
    const url = urlMatch[1];
    const urlObj = new URL(url);

    // Extract method
    const methodMatch = curl.match(/-X\s+(\w+)/);
    const method = methodMatch ? methodMatch[1] : 'GET';

    // Extract headers
    const headers = [];
    const headerRegex = /-H\s+['"]([^'"]+)['"]/g;
    let headerMatch;
    while ((headerMatch = headerRegex.exec(curl)) !== null) {
      headers.push(headerMatch[1]);
    }

    // Extract data
    const dataMatch = curl.match(/--data(?:-raw)?\s+['"](.+?)['"]/s);
    const data = dataMatch ? dataMatch[1] : null;

    // Build HTTP request
    let request = `${method} ${urlObj.pathname}${urlObj.search} HTTP/1.1\n`;
    request += `Host: ${urlObj.host}\n`;

    for (let header of headers) {
      request += `${header}\n`;
    }

    if (data) {
      request += `Content-Length: ${data.length}\n`;
    }

    request += '\n';

    if (data) {
      request += data;
    }

    state.text = request;
  } catch (error) {
    state.postError("Failed to parse curl command: " + error.message);
  }
}
