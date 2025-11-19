/**
  {
    "api": 1,
    "name": "Remove Blank Lines",
    "description": "Removes all blank lines",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.filter(line => line.trim().length > 0).join('\n');
}
