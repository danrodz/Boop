/**
  {
    "api": 1,
    "name": "Split on Comma (to lines)",
    "description": "Splits comma-separated to lines",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.split(',').map(s => s.trim()).join('\n');
}
