/**
  {
    "api": 1,
    "name": "Fraktur Text",
    "description": "Converts text to Fraktur Unicode characters",
    "author": "Boop",
    "icon": "textformat",
    "tags": "fraktur,gothic,unicode,fancy,font"
  }
**/

function toFraktur(char) {
  if (char >= 'A' && char <= 'Z') {
    return String.fromCodePoint(0x1D504 + (char.charCodeAt(0) - 65));
  } else if (char >= 'a' && char <= 'z') {
    return String.fromCodePoint(0x1D51E + (char.charCodeAt(0) - 97));
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toFraktur).join('');
}
