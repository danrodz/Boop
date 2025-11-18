/**
  {
    "api": 1,
    "name": "Invert Case",
    "description": "Inverts the case of all letters",
    "author": "Boop",
    "icon": "arrow.up.arrow.down",
    "tags": "invert,case,swap,toggle"
  }
**/

function main(state) {
  state.text = state.text.split('').map(char => {
    if (char === char.toUpperCase()) {
      return char.toLowerCase();
    } else {
      return char.toUpperCase();
    }
  }).join('');
}
