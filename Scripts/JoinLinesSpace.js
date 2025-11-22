/**
  {
    "api": 1,
    "name": "Join Lines (Space)",
    "description": "Joins all lines with spaces",
    "author": "Boop",
    "icon": "arrow.right.to.line",
    "tags": "join,lines,space,merge"
  }
**/

function main(state) {
  state.text = state.text.split('\n').map(l => l.trim()).filter(l => l).join(' ');
}
