/**
  {
    "api": 1,
    "name": "Escape JSON String",
    "description": "Escapes special characters for JSON strings",
    "author": "Boop",
    "icon": "quote",
    "tags": "escape,json,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = JSON.stringify(state.text).slice(1, -1);
  } catch (error) {
    state.postError("Failed to escape JSON string");
  }
}
