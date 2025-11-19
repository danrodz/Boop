/**
  {
    "api": 1,
    "name": "First Letter Uppercase",
    "description": "Capitalizes first letter",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) {
  state.text = state.text.charAt(0).toUpperCase() + state.text.slice(1);
}
