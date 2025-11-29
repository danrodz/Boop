/**
  {
    "api": 1,
    "name": "Reverse Lines",
    "description": "Reverses the order of lines",
    "author": "Boop",
    "icon": "arrow.up.arrow.down",
    "tags": "reverse,lines,order,flip"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const reversed = lines.reverse();

  state.text = reversed.join('\n');

  if (typeof state.postInfo === 'function') {
    state.postInfo("Reversed line order");
  }
}
