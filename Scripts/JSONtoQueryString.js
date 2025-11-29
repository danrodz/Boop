/**
  {
    "api": 1,
    "name": "JSON to Query String",
    "description": "Convert JSON object to URL query string",
    "author": "Boop",
    "icon": "link",
    "tags": "json,url,query,convert,api"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(obj)) {
      if (value !== null && value !== undefined) {
        params.append(key, String(value));
      }
    }

    state.text = params.toString();
    state.postInfo("Converted to query string");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
