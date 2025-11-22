/**
  {
    "api": 1,
    "name": "Escape JSON String",
    "description": "Escapes string for use in JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,escape,string,encode"
  }
**/

function main(state) {
  const escaped = state.text
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/\f/g, '\\f')
    .replace(/\b/g, '\\b');

  state.text = `"${escaped}"`;
}
