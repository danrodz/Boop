/**
  {
    "api": 1,
    "name": "Join Lines with Pipe",
    "description": "Joins lines with pipes",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  state.text = lines.join(' | ');
}
