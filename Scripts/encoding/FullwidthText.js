/**
  {
    "api": 1,
    "name": "Fullwidth Text",
    "description": "Converts text to fullwidth Unicode characters",
    "author": "Boop",
    "icon": "textformat.size",
    "tags": "fullwidth,unicode,japanese,cjk"
  }
**/

function toFullwidth(char) {
  const code = char.charCodeAt(0);
  if (code >= 33 && code <= 126) {
    return String.fromCharCode(code + 0xFEE0);
  } else if (code === 32) {
    return String.fromCharCode(0x3000);
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toFullwidth).join('');
}
