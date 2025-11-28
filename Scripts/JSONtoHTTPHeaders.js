/**
  {
    "api": 1,
    "name": "JSON to HTTP Headers",
    "description": "Convert JSON object to HTTP header format",
    "author": "Boop",
    "icon": "doc",
    "tags": "json,http,headers,convert,api"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const headers = [];

    for (const [key, value] of Object.entries(obj)) {
      headers.push(`${key}: ${value}`);
    }

    state.text = headers.join('\n');
    state.postInfo("Converted to HTTP headers");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
