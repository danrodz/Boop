/**
  {
    "api": 1,
    "name": "Square Text",
    "description": "Converts text to squared characters",
    "author": "Boop",
    "icon": "square",
    "tags": "square,unicode,fancy"
  }
**/

function toSquare(char) {
  if (char >= 'A' && char <= 'Z') {
    return String.fromCodePoint(0x1F130 + (char.charCodeAt(0) - 65));
  } else if (char >= 'a' && char <= 'z') {
    return String.fromCodePoint(0x1F130 + (char.toUpperCase().charCodeAt(0) - 65));
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toSquare).join('');
}
