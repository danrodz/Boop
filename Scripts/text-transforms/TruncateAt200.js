/**
  {
    "api": 1,
    "name": "Truncate at 200 chars",
    "description": "Truncates text at 200 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.length > 200 ? state.text.slice(0, 200) + '...' : state.text;
}
