/**
  {
    "api": 1,
    "name": "Split on Pipe (to lines)",
    "description": "Splits pipe-separated to lines",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.split('|').map(s => s.trim()).join('\n');
}
