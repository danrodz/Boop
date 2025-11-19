/**
  {
    "api": 1,
    "name": "Validate Hex Color",
    "description": "Checks if valid hex color",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,transform,validation"
  }
**/

function main(state) {
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  const isValid = hexRegex.test(state.text.trim());
  state.text = isValid ? 'Valid hex color' : 'Invalid hex color';
}
