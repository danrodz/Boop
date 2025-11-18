/**
  {
    "api": 1,
    "name": "Text to Binary",
    "description": "Converts text to binary (8-bit)",
    "author": "Boop",
    "icon": "01.circle",
    "tags": "binary,encode,text"
  }
**/

function main(state) {
  const text = state.text;
  const result = text.split('').map(char => {
    return char.charCodeAt(0).toString(2).padStart(8, '0');
  }).join(' ');
  state.text = result;
}
