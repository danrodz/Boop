/**
  {
    "api": 1,
    "name": "Double Space Lines",
    "description": "Adds blank line between each line",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.join('\n\n');
}
