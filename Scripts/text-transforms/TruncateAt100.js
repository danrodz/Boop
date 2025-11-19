/**
  {
    "api": 1,
    "name": "Truncate at 100 chars",
    "description": "Truncates text at 100 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.length > 100 ? state.text.slice(0, 100) + '...' : state.text;
}
