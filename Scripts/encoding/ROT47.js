/**
  {
    "api": 1,
    "name": "ROT47",
    "description": "Applies ROT47 cipher (all ASCII printable characters)",
    "author": "Boop",
    "icon": "arrow.triangle.2.circlepath",
    "tags": "rot47,cipher,encode,decode"
  }
**/

function rot47(text) {
  return text.replace(/[!-~]/g, function(char) {
    return String.fromCharCode(33 + (char.charCodeAt(0) - 33 + 47) % 94);
  });
}

function main(state) {
  state.text = rot47(state.text);
}
