/**
  {
    "api": 1,
    "name": "Sort Lines A-Z",
    "description": "Sorts lines alphabetically A-Z",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.sort().join('\n');
}
