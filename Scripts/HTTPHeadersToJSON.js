/**
  {
    "api": 1,
    "name": "HTTP Headers to JSON",
    "description": "Parse HTTP headers into JSON object",
    "author": "Boop",
    "icon": "doc",
    "tags": "http,headers,json,parse,api"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const headers = {};

  lines.forEach(line => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex > 0) {
      const key = line.substring(0, separatorIndex).trim();
      const value = line.substring(separatorIndex + 1).trim();
      if (key && value) {
        headers[key] = value;
      }
    }
  });

  state.text = JSON.stringify(headers, null, 2);
  state.postInfo("Converted headers to JSON");
}
