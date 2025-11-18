/**
  {
    "api": 1,
    "name": "JSON Unescape String",
    "description": "Unescapes JSON string",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  const unescaped = state.text
    .replace(/\\\\/g, '\\')
    .replace(/\\"/g, '"')
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t');
  state.text = unescaped;
}
