/**
  {
    "api": 1,
    "name": "Unescape PHP String",
    "description": "Unescapes PHP string escape sequences",
    "author": "Boop",
    "icon": "quote",
    "tags": "unescape,php,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/\\t/g, '\t')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\$/g, '$')
      .replace(/\\\\/g, '\\');
  } catch (error) {
    state.postError("Failed to unescape PHP string");
  }
}
