/**
  {
    "api": 1,
    "name": "Format Number (6 decimals)",
    "description": "Formats numbers to 6 decimal places",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const formatted = numbers.map(n => parseFloat(n).toFixed(6));
    state.text = formatted.join(', ');
  }
}
