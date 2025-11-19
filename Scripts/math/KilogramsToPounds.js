/**
  {
    "api": 1,
    "name": "Kilograms to Pounds",
    "description": "Converts kilograms to pounds",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const kg = parseFloat(state.text);
  const lbs = kg / 0.453592;
  state.text = lbs.toFixed(2) + ' lbs';
}
