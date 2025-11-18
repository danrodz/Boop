/**
  {
    "api": 1,
    "name": "Single Space (Remove Extra)",
    "description": "Removes extra blank lines",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,format"
  }
**/

function main(state) {
  state.text = state.text.replace(/\n\n+/g, '\n');
}
