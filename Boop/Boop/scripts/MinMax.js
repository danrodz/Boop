/**
{
  "api": 1,
  "name": "Get Min/Max",
  "description": "Finds minimum and maximum numbers",
  "author": "Boop",
  "icon": "number",
  "tags": "min,max,numbers"
}
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (!numbers || numbers.length === 0) {
    state.postError("No numbers found");
    return;
  }
  
  const nums = numbers.map(parseFloat);
  const min = Math.min(...nums);
  const max = Math.max(...nums);
  
  state.text = `Min: ${min}\nMax: ${max}`;
}
