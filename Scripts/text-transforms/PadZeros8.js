/**
  {
    "api": 1,
    "name": "Pad with Zeros (8 digits)",
    "description": "Pads number with zeros to 8 digits",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.padStart(8, '0');
}
