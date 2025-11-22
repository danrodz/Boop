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
  state.text = lines.reverse().join('\n');
}
