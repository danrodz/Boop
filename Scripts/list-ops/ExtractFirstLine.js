/**
  {
    "api": 1,
    "name": "Extract First Line",
    "description": "Extracts only the first line",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines[0] || '';
}
