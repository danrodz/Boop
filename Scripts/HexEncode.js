/**
  {
    "api": 1,
    "name": "Hex Encode",
    "description": "Encodes text to hexadecimal",
    "author": "Boop",
    "icon": "number.circle.fill",
    "tags": "hex,hexadecimal,encode"
  }
**/

function main(state) {
  const bytes = new TextEncoder().encode(state.text);
  const hex = Array.from(bytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  state.text = hex;
}
