/**
  {
    "api": 1,
    "name": "Capitalize Each Word",
    "description": "Capitalizes first letter of each word",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) {
  state.text = state.text.replace(/\b\w/g, l => l.toUpperCase());
}
