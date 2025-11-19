/**
  {
    "api": 1,
    "name": "Pad Right (20 chars)",
    "description": "Pads right to 20 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.padEnd(20, ' ');
}
