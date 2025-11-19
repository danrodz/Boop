/**
  {
    "api": 1,
    "name": "Pounds to Kilograms",
    "description": "Converts pounds to kilograms",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const lbs = parseFloat(state.text);
  const kg = lbs * 0.453592;
  state.text = kg.toFixed(2) + ' kg';
}
