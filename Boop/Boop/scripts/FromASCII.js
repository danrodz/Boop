/**
{
  "api": 1,
  "name": "From ASCII Codes",
  "description": "Converts ASCII code points to text",
  "author": "Boop",
  "icon": "textformat",
  "tags": "ascii,code,charcode,decode"
}
**/

function main(state) {
  const codes = state.text.trim().split(/\s+/).map(Number);
  state.text = String.fromCharCode(...codes);
}
