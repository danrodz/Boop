/**
  {
    "api": 1,
    "name": "Atbash Cipher",
    "description": "Applies Atbash cipher (reverse alphabet substitution)",
    "author": "Boop",
    "icon": "arrow.left.arrow.right",
    "tags": "atbash,cipher,encode,decode"
  }
**/

function atbash(text) {
  return text.replace(/[a-zA-Z]/g, function(char) {
    if (char >= 'a' && char <= 'z') {
      return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
    } else {
      return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
    }
  });
}

function main(state) {
  state.text = atbash(state.text);
}
