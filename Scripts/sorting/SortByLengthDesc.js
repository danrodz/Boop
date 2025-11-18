/**
  {
    "api": 1,
    "name": "Sort Lines by Length (desc)",
    "description": "Sorts lines by length (long to short)",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.sort((a, b) => b.length - a.length).join('\n');
}
