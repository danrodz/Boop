/**
  {
    "api": 1,
    "name": "Halfwidth Text",
    "description": "Converts fullwidth text to halfwidth characters",
    "author": "Boop",
    "icon": "textformat.size",
    "tags": "halfwidth,unicode,japanese,cjk"
  }
**/

function toHalfwidth(char) {
  const code = char.charCodeAt(0);
  if (code >= 0xFF01 && code <= 0xFF5E) {
    return String.fromCharCode(code - 0xFEE0);
  } else if (code === 0x3000) {
    return ' ';
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toHalfwidth).join('');
}
