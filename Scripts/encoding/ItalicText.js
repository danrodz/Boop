/**
  {
    "api": 1,
    "name": "Italic Text (Unicode)",
    "description": "Converts text to italic Unicode characters",
    "author": "Boop",
    "icon": "italic",
    "tags": "italic,unicode,fancy,font"
  }
**/

function toItalic(char) {
  if (char >= 'A' && char <= 'Z') {
    return String.fromCodePoint(0x1D434 + (char.charCodeAt(0) - 65));
  } else if (char >= 'a' && char <= 'z') {
    return String.fromCodePoint(0x1D44E + (char.charCodeAt(0) - 97));
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toItalic).join('');
}
