/**
  {
    "api": 1,
    "name": "Extract Even Lines",
    "description": "Keeps only even-numbered lines",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.filter((_, i) => i % 2 === 1).join('\n');
}
