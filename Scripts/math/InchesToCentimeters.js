/**
  {
    "api": 1,
    "name": "Inches to Centimeters",
    "description": "Converts inches to centimeters",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const inches = parseFloat(state.text);
  const cm = inches * 2.54;
  state.text = cm.toFixed(2) + ' cm';
}
