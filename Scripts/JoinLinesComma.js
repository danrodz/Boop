/**
  {
    "api": 1,
    "name": "Join Lines (Comma)",
    "description": "Joins all lines with commas",
    "author": "Boop",
    "icon": "arrow.right.to.line",
    "tags": "join,lines,comma,merge,csv"
  }
**/

function main(state) {
  state.text = state.text.split('\n').map(l => l.trim()).filter(l => l).join(', ');
}
