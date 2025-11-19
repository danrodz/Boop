/**
  {
    "api": 1,
    "name": "Kilometers to Miles",
    "description": "Converts kilometers to miles",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const km = parseFloat(state.text);
  const miles = km / 1.60934;
  state.text = miles.toFixed(2) + ' mi';
}
