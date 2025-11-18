/**
  {
    "api": 1,
    "name": "ROT9 Cipher",
    "description": "Applies ROT9 cipher to text",
    "author": "Boop",
    "icon": "arrow.triangle.2.circlepath",
    "tags": "cipher,rotate,transform,encode"
  }
**/

function main(state) {
  state.text = state.text.replace(/[a-zA-Z]/g, function(char) {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + (char.charCodeAt(0) - start + 9) % 26);
  });
}
