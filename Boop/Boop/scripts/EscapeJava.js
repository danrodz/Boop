/**
  {
    "api": 1,
    "name": "Escape Java String",
    "description": "Escapes special characters for Java strings",
    "author": "Boop",
    "icon": "quote",
    "tags": "escape,java,string,quotes"
  }
**/

function main(state) {
  try {
    state.text = state.text
      .replace(/\\/g, '\\\\')
      .replace(/\t/g, '\\t')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\f/g, '\\f')
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'");
  } catch (error) {
    state.postError("Failed to escape Java string");
  }
}
