/**
  {
    "api": 1,
    "name": "Fetch to cURL",
    "description": "Convert JavaScript fetch() to cURL command",
    "author": "Boop",
    "icon": "code",
    "tags": "fetch,curl,javascript,api,convert"
  }
**/

function main(state) {
  try {
    const text = state.text;

    // Extract URL
    const urlMatch = text.match(/fetch\(['"]([^'"]+)['"]/);
    if (!urlMatch) {
      state.postError("Could not find fetch URL");
      return;
    }
    const url = urlMatch[1];

    // Extract method
    const methodMatch = text.match(/method:\s*['"](\w+)['"]/);
    const method = methodMatch ? methodMatch[1] : 'GET';

    // Extract headers
    const headersMatch = text.match(/headers:\s*\{([^}]+)\}/s);
    let headerArgs = '';
    if (headersMatch) {
      const headerLines = headersMatch[1].split(',');
      headerLines.forEach(line => {
        const match = line.match(/['"]([^'"]+)['"]:\s*['"]([^'"]+)['"]/);
        if (match) {
          headerArgs += ` -H "${match[1]}: ${match[2]}"`;
        }
      });
    }

    // Extract body
    const bodyMatch = text.match(/body:\s*['"]([^'"]+)['"]/);
    let bodyArg = '';
    if (bodyMatch) {
      bodyArg = ` --data '${bodyMatch[1]}'`;
    }

    const curl = `curl -X ${method}${headerArgs}${bodyArg} '${url}'`;

    state.text = curl;
    state.postInfo("Converted fetch to cURL");
  } catch (error) {
    state.postError(`Error: ${error.message}`);
  }
}
