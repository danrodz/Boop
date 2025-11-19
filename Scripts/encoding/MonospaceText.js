/**
  {
    "api": 1,
    "name": "Monospace Text",
    "description": "Converts text to monospace Unicode characters",
    "author": "Boop",
    "icon": "textformat.size",
    "tags": "monospace,unicode,fancy,font"
  }
**/

function toMonospace(char) {
  if (char >= 'A' && char <= 'Z') {
    return String.fromCodePoint(0x1D670 + (char.charCodeAt(0) - 65));
  } else if (char >= 'a' && char <= 'z') {
    return String.fromCodePoint(0x1D68A + (char.charCodeAt(0) - 97));
  } else if (char >= '0' && char <= '9') {
    return String.fromCodePoint(0x1D7F6 + (char.charCodeAt(0) - 48));
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toMonospace).join('');
}
