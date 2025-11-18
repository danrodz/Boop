/**
  {
    "api": 1,
    "name": "Caesar Cipher (Shift 3)",
    "description": "Applies Caesar cipher with shift of 3",
    "author": "Boop",
    "icon": "arrow.right.circle",
    "tags": "caesar,cipher,shift,encode"
  }
**/

function caesarShift(text, shift) {
  return text.replace(/[a-zA-Z]/g, function(char) {
    const start = char <= 'Z' ? 65 : 97;
    return String.fromCharCode(start + (char.charCodeAt(0) - start + shift) % 26);
  });
}

function main(state) {
  state.text = caesarShift(state.text, 3);
}
