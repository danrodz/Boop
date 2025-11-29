/**
{
  "api": 1,
  "name": "Add Thousands Separators",
  "description": "Adds commas to numbers (thousands separators)",
  "author": "Boop",
  "icon": "number",
  "tags": "comma,thousands,format"
}
**/

function main(state) {
  state.text = state.text.replace(/\b(\d+)(\d{3})\b/g, '$1,$2');
  // Repeat for larger numbers
  state.text = state.text.replace(/\b(\d+)(\d{3}),/g, '$1,$2,');
  state.text = state.text.replace(/\b(\d+)(\d{3}),/g, '$1,$2,');
}
