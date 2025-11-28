/**
{
  "api": 1,
  "name": "To ASCII Codes",
  "description": "Converts text to ASCII code points (space separated)",
  "author": "Boop",
  "icon": "number",
  "tags": "ascii,code,charcode,convert"
}
**/

function main(state) {
  const codes = [];
  for (let i = 0; i < state.text.length; i++) {
    codes.push(state.text.charCodeAt(i));
  }
  state.text = codes.join(' ');
}
