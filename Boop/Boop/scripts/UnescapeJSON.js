/**
  {
    "api": 1,
    "name": "Unescape JSON String",
    "description": "Unescapes JSON string escape sequences",
    "author": "Boop",
    "icon": "quote",
    "tags": "unescape,json,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = JSON.parse('"' + state.text + '"');
  } catch (error) {
    state.postError("Failed to unescape JSON string");
  }
}
