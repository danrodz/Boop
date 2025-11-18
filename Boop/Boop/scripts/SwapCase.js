/**
  {
    "api": 1,
    "name": "Swap Case",
    "description": "Swaps the case of each character (upper to lower, lower to upper)",
    "author": "Boop",
    "icon": "type",
    "tags": "swap,case,toggle,invert"
  }
**/

function main(state) {
  try {
    state.text = state.text.split('').map(char => {
      if (char === char.toUpperCase()) {
        return char.toLowerCase();
      } else {
        return char.toUpperCase();
      }
    }).join('');
  } catch (error) {
    state.postError("Failed to swap case");
  }
}
