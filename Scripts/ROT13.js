/**
  {
    "api": 1,
    "name": "ROT13 Cipher",
    "description": "Applies ROT13 cipher (encode/decode)",
    "author": "Boop",
    "icon": "arrow.triangle.2.circlepath",
    "tags": "rot13,cipher,encode,decode,crypto"
  }
**/

function main(state) {
  state.text = state.text.replace(/[a-zA-Z]/g, (char) => {
    const base = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}
