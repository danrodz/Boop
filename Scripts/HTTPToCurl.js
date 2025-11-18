/**
  {
    "api": 1,
    "name": "HTTP Request to Curl",
    "description": "Convert raw HTTP request to curl command",
    "author": "Boop",
    "icon": "terminal",
    "tags": "http,curl,convert,request"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');

    // Parse request line
    const requestLine = lines[0].split(' ');
    const method = requestLine[0];
    const path = requestLine[1];

    // Parse headers
    let host = '';
    const headers = [];
    let i = 1;

    for (; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) break;

      if (line.toLowerCase().startsWith('host:')) {
        host = line.substring(5).trim();
      } else {
        headers.push(line);
      }
    }

    // Get body
    const body = lines.slice(i + 1).join('\n').trim();

    // Build curl command
    let curl = `curl -X ${method}`;

    // Add URL
    const protocol = 'https://'; // Assume HTTPS
    curl += ` '${protocol}${host}${path}'`;

    // Add headers
    for (let header of headers) {
      curl += ` \\\n  -H '${header}'`;
    }

    // Add body
    if (body) {
      curl += ` \\\n  --data '${body.replace(/'/g, "'\\''")}'`;
    }

    state.text = curl;
  } catch (error) {
    state.postError("Failed to parse HTTP request: " + error.message);
  }
}
