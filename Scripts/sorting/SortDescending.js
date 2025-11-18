/**
  {
    "api": 1,
    "name": "Sort Lines Z-A",
    "description": "Sorts lines alphabetically Z-A",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.sort().reverse().join('\n');
}
