/**
  {
    "api": 1,
    "name": "Format Number (2 decimals)",
    "description": "Formats numbers to 2 decimal places",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const formatted = numbers.map(n => parseFloat(n).toFixed(2));
    state.text = formatted.join(', ');
  }
}
