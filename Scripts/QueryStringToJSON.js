/**
  {
    "api": 1,
    "name": "Query String to JSON",
    "description": "Convert URL query string to JSON object",
    "author": "Boop",
    "icon": "link",
    "tags": "url,query,json,convert,api"
  }
**/

function main(state) {
  try {
    let queryString = state.text.trim();

    // Remove leading ? if present
    if (queryString.startsWith('?')) {
      queryString = queryString.substring(1);
    }

    const params = {};
    const pairs = queryString.split('&');

    pairs.forEach(pair => {
      const [key, value] = pair.split('=');
      if (key) {
        params[decodeURIComponent(key)] = value ? decodeURIComponent(value) : '';
      }
    });

    state.text = JSON.stringify(params, null, 2);
    state.postInfo("Converted query string to JSON");
  } catch (error) {
    state.postError(`Error: ${error.message}`);
  }
}
