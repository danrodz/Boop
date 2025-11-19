/**
  {
    "api": 1,
    "name": "Centimeters to Inches",
    "description": "Converts centimeters to inches",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const cm = parseFloat(state.text);
  const inches = cm / 2.54;
  state.text = inches.toFixed(2) + ' in';
}
