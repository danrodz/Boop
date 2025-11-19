/**
  {
    "api": 1,
    "name": "Sort Numbers",
    "description": "Sorts numbers numerically",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  state.text = lines.sort((a, b) => parseFloat(a) - parseFloat(b)).join('\n');
}
