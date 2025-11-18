/**
  {
    "api": 1,
    "name": "Swap Adjacent Characters",
    "description": "Swaps each pair of adjacent characters",
    "author": "Boop",
    "icon": "swap",
    "tags": "swap,characters,exchange,reorder"
  }
**/

function main(state) {
  try {
    const chars = state.text.split('');
    const swapped = [];

    for (let i = 0; i < chars.length; i += 2) {
      if (i + 1 < chars.length) {
        swapped.push(chars[i + 1]);
        swapped.push(chars[i]);
      } else {
        swapped.push(chars[i]);
      }
    }

    state.text = swapped.join('');
  } catch (error) {
    state.postError("Failed to swap characters");
  }
}
