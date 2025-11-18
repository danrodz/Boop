/**
  {
    "api": 1,
    "name": "Take Last 10 Lines",
    "description": "Keeps last 10 lines",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.slice(-10).join('\n');
}
