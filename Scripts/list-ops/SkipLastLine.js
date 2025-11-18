/**
  {
    "api": 1,
    "name": "Skip Last Line",
    "description": "Removes last line",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.slice(0, -1).join('\n');
}
