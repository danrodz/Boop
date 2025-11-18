/**
  {
    "api": 1,
    "name": "Swap Adjacent Lines",
    "description": "Swaps each pair of adjacent lines",
    "author": "Boop",
    "icon": "swap",
    "tags": "swap,lines,exchange,reorder"
  }
**/

function main(state) {
  try {
    const lines = state.text.split("\n");
    const swapped = [];

    for (let i = 0; i < lines.length; i += 2) {
      if (i + 1 < lines.length) {
        swapped.push(lines[i + 1]);
        swapped.push(lines[i]);
      } else {
        swapped.push(lines[i]);
      }
    }

    state.text = swapped.join("\n");
  } catch (error) {
    state.postError("Failed to swap lines");
  }
}
