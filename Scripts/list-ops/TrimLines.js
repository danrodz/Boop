/**
  {
    "api": 1,
    "name": "Trim Each Line",
    "description": "Removes leading/trailing whitespace from each line",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.map(line => line.trim()).join('\n');
}
