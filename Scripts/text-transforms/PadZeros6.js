/**
  {
    "api": 1,
    "name": "Pad with Zeros (6 digits)",
    "description": "Pads number with zeros to 6 digits",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.padStart(6, '0');
}
