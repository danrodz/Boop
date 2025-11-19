/**
  {
    "api": 1,
    "name": "Truncate at 50 chars",
    "description": "Truncates text at 50 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.length > 50 ? state.text.slice(0, 50) + '...' : state.text;
}
