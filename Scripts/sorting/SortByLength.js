/**
  {
    "api": 1,
    "name": "Sort Lines by Length",
    "description": "Sorts lines by length (short to long)",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.sort((a, b) => a.length - b.length).join('\n');
}
