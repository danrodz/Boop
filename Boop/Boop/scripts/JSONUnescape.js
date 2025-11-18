/**
{
  "api": 1,
  "name": "JSON String Unescape",
  "description": "Unescapes JSON string escape sequences",
  "author": "Boop",
  "icon": "textformat.characters",
  "tags": "json,unescape,decode"
}
**/

function main(state) {
  try {
    state.text = JSON.parse('"' + state.text + '"');
  } catch (e) {
    state.postError("Invalid JSON escape sequences");
  }
}
