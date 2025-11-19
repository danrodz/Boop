/**
  {
    "api": 1,
    "name": "Bubble Text",
    "description": "Converts text to bubble/circled characters",
    "author": "Boop",
    "icon": "circlebadge",
    "tags": "bubble,circle,unicode,fancy"
  }
**/

function toBubble(char) {
  if (char >= 'A' && char <= 'Z') {
    return String.fromCodePoint(0x1F150 + (char.charCodeAt(0) - 65));
  } else if (char >= 'a' && char <= 'z') {
    return String.fromCodePoint(0x24D0 + (char.charCodeAt(0) - 97));
  } else if (char >= '0' && char <= '9') {
    return String.fromCodePoint(0x2460 + (char.charCodeAt(0) - 48));
  }
  return char;
}

function main(state) {
  state.text = state.text.split('').map(toBubble).join('');
}
