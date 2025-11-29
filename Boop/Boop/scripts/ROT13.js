/**
{
  "api": 1,
  "name": "ROT13 Encode/Decode",
  "description": "Applies ROT13 cipher to text",
  "author": "Boop",
  "icon": "arrow.triangle.2.circlepath",
  "tags": "rot13,cipher,encode,decode"
}
**/

function main(state) {
  state.text = state.text.replace(/[a-zA-Z]/g, function(c) {
    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
  });
}
