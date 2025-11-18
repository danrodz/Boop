/**
  {
    "api": 1,
    "name": "Format Number (1 decimals)",
    "description": "Formats numbers to 1 decimal places",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const numbers = state.text.match(/-?\d+\.?\d*/g);
  if (numbers) {
    const formatted = numbers.map(n => parseFloat(n).toFixed(1));
    state.text = formatted.join(', ');
  }
}
