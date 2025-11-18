/**
  {
    "api": 1,
    "name": "Pad Left (20 chars)",
    "description": "Pads left to 20 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.padStart(20, ' ');
}
