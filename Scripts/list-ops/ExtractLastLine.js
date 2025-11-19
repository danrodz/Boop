/**
  {
    "api": 1,
    "name": "Extract Last Line",
    "description": "Extracts only the last line",
    "author": "Boop",
    "icon": "list.bullet",
    "tags": "list,lines,array,transform"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines[lines.length - 1] || '';
}
