/**
  {
    "api": 1,
    "name": "Unescape JavaScript String",
    "description": "Unescapes JavaScript string escape sequences",
    "author": "Boop",
    "icon": "quote",
    "tags": "unescape,javascript,js,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/\\t/g, '\t')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\f/g, '\f')
      .replace(/\\b/g, '\b')
      .replace(/\\v/g, '\v')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\0/g, '\0')
      .replace(/\\\\/g, '\\');
  } catch (error) {
    state.postError("Failed to unescape JavaScript string");
  }
}
