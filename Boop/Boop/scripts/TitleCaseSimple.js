/**
{
  "api": 1,
  "name": "Title Case (Simple)",
  "description": "Converts text to Title Case",
  "author": "Boop",
  "icon": "textformat",
  "tags": "title,case,capitalize"
}
**/

function main(state) {
  state.text = state.text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
