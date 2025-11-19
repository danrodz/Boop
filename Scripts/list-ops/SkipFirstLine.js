/**
  {
    "api": 1,
    "name": "Skip First Line",
    "description": "Removes first line",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.slice(1).join('\n');
}
