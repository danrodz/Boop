/**
  {
    "api": 1,
    "name": "Unescape Java String",
    "description": "Unescapes Java string escape sequences",
    "author": "Boop",
    "icon": "quote",
    "tags": "unescape,java,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/\\t/g, '\t')
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\f/g, '\f')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\\/g, '\\');
  } catch (error) {
    state.postError("Failed to unescape Java string");
  }
}
