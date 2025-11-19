/**
  {
    "api": 1,
    "name": "Subtract 7 Days",
    "description": "Subtracts 7 days from date",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  date.setDate(date.getDate() - 7);
  state.text = date.toISOString();
}
