/**
  {
    "api": 1,
    "name": "Validate URL",
    "description": "Validate URL format and extract components",
    "author": "Boop",
    "icon": "link",
    "tags": "url,validate,check"
  }
**/

function main(state) {
  try {
    const urlStr = state.text.trim();

    try {
      const url = new URL(urlStr);

      let result = '✓ Valid URL\n\n';
      result += `Protocol: ${url.protocol}\n`;
      result += `Host: ${url.hostname}\n`;
      result += `Port: ${url.port || 'default'}\n`;
      result += `Path: ${url.pathname}\n`;
      result += `Query: ${url.search || 'none'}\n`;
      result += `Hash: ${url.hash || 'none'}`;

      state.text = result;
    } catch {
      state.text = '✗ Invalid URL\n\nURL must include protocol (http:// or https://)';
    }
  } catch (error) {
    state.postError("Validation failed: " + error.message);
  }
}
