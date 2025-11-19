/**
  {
    "api": 1,
    "name": "Pad Left (10 chars)",
    "description": "Pads left to 10 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.padStart(10, ' ');
}
