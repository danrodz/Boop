/**
  {
    "api": 1,
    "name": "First Letter Lowercase",
    "description": "Lowercases first letter",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) {
  state.text = state.text.charAt(0).toLowerCase() + state.text.slice(1);
}
