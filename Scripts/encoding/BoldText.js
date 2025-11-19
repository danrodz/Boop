/**
  {
    "api": 1,
    "name": "Bold Text (Unicode)",
    "description": "Converts text to bold Unicode characters",
    "author": "Boop",
    "icon": "bold",
    "tags": "bold,unicode,fancy,font"
  }
**/

function toBold(char) {
  if (char >= 'A' && char <= 'Z') {
    return String.fromCodePoint(0x1D400 + (char.charCodeAt(0) - 65));
  } else if (char >= 'a' && char <= 'z') {
    return String.fromCodePoint(0x1D41A + (char.charCodeAt(0) - 97));
  } else if (char >= '0' && char <= '9') {
    return String.fromCodePoint(0x1D7CE + (char.charCodeAt(0) - 48));
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toBold).join('');
}
