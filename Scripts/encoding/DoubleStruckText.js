/**
  {
    "api": 1,
    "name": "Double-Struck Text",
    "description": "Converts text to double-struck Unicode characters",
    "author": "Boop",
    "icon": "textformat",
    "tags": "double-struck,unicode,fancy,font,mathematical"
  }
**/

function toDoubleStruck(char) {
  if (char >= 'A' && char <= 'Z') {
    return String.fromCodePoint(0x1D538 + (char.charCodeAt(0) - 65));
  } else if (char >= 'a' && char <= 'z') {
    return String.fromCodePoint(0x1D552 + (char.charCodeAt(0) - 97));
  } else if (char >= '0' && char <= '9') {
    return String.fromCodePoint(0x1D7D8 + (char.charCodeAt(0) - 48));
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toDoubleStruck).join('');
}
