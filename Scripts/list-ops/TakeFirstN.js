/**
  {
    "api": 1,
    "name": "Take First 10 Lines",
    "description": "Keeps first 10 lines",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.slice(0, 10).join('\n');
}
