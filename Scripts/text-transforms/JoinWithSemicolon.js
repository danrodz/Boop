/**
  {
    "api": 1,
    "name": "Join Lines with Semicolon",
    "description": "Joins lines with semicolons",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  state.text = lines.join('; ');
}
