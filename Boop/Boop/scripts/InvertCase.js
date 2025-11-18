/**
{
  "api": 1,
  "name": "Invert Case",
  "description": "Inverts the case of each character",
  "author": "Boop",
  "icon": "arrow.up.arrow.down",
  "tags": "invert,case,toggle,swap"
}
**/

function main(state) {
  state.text = state.text.split('').map(char => {
    if (char === char.toUpperCase()) {
      return char.toLowerCase();
    }
    return char.toUpperCase();
  }).join('');
}
