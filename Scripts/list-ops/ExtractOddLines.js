/**
  {
    "api": 1,
    "name": "Extract Odd Lines",
    "description": "Keeps only odd-numbered lines",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.filter((_, i) => i % 2 === 0).join('\n');
}
