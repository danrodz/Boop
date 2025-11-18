/**
  {
    "api": 1,
    "name": "Simple Word Count",
    "description": "Counts words",
    "author": "Boop",
    "icon": "star",
    "tags": "utility"
  }
**/

function main(state) {
  const count = state.text.split(/\s+/).filter(w => w).length;
  state.text = String(count);
}
