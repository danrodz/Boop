/**
  {
    "api": 1,
    "name": "Celsius to Fahrenheit",
    "description": "Converts temperature C to F",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const celsius = parseFloat(state.text);
  const fahrenheit = (celsius * 9/5) + 32;
  state.text = fahrenheit.toFixed(2) + '°F';
}
