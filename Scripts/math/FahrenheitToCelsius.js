/**
  {
    "api": 1,
    "name": "Fahrenheit to Celsius",
    "description": "Converts temperature F to C",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const fahrenheit = parseFloat(state.text);
  const celsius = (fahrenheit - 32) * 5/9;
  state.text = celsius.toFixed(2) + '°C';
}
