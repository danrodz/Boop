/**
  {
    "api": 1,
    "name": "Pad with Zeros (4 digits)",
    "description": "Pads number with zeros to 4 digits",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  state.text = state.text.padStart(4, '0');
}
