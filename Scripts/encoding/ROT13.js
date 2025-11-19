/**
  {
    "api": 1,
    "name": "ROT13",
    "description": "Applies ROT13 cipher (Caesar cipher with shift 13)",
    "author": "Boop",
    "icon": "arrow.triangle.2.circlepath",
    "tags": "rot13,cipher,caesar,encode,decode"
  }
**/

function rot13(text) {
  return text.replace(/[a-zA-Z]/g, function(char) {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + (char.charCodeAt(0) - start + 13) % 26);
  });
}

function main(state) {
  state.text = rot13(state.text);
}
