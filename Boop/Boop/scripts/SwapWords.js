/**
  {
    "api": 1,
    "name": "Swap Adjacent Words",
    "description": "Swaps each pair of adjacent words",
    "author": "Boop",
    "icon": "swap",
    "tags": "swap,words,exchange,reorder"
  }
**/

function main(state) {
  try {
    const words = state.text.split(/\s+/);
    const swapped = [];

    for (let i = 0; i < words.length; i += 2) {
      if (i + 1 < words.length) {
        swapped.push(words[i + 1]);
        swapped.push(words[i]);
      } else {
        swapped.push(words[i]);
      }
    }

    state.text = swapped.join(' ');
  } catch (error) {
    state.postError("Failed to swap words");
  }
}
