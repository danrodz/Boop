/**
  {
    "api": 1,
    "name": "Remove Indentation",
    "description": "Removes leading whitespace from lines",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => line.trimStart()).join('\n');
}
