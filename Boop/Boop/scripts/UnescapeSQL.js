/**
  {
    "api": 1,
    "name": "Unescape SQL String",
    "description": "Unescapes doubled single quotes in SQL strings",
    "author": "Boop",
    "icon": "quote",
    "tags": "unescape,sql,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text.replace(/''/g, "'");
  } catch (error) {
    state.postError("Failed to unescape SQL string");
  }
}
