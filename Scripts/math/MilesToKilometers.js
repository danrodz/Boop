/**
  {
    "api": 1,
    "name": "Miles to Kilometers",
    "description": "Converts miles to kilometers",
    "author": "Boop",
    "icon": "function",
    "tags": "math,calculate,convert,numbers"
  }
**/

function main(state) {
  const miles = parseFloat(state.text);
  const km = miles * 1.60934;
  state.text = km.toFixed(2) + ' km';
}
