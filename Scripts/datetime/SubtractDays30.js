/**
  {
    "api": 1,
    "name": "Subtract 30 Days",
    "description": "Subtracts 30 days from date",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  date.setDate(date.getDate() - 30);
  state.text = date.toISOString();
}
