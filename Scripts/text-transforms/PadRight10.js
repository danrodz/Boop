/**
  {
    "api": 1,
    "name": "Pad Right (10 chars)",
    "description": "Pads right to 10 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.padEnd(10, ' ');
}
