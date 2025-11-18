/**
  {
    "api": 1,
    "name": "Add 7 Days to Date",
    "description": "Adds 7 days to date",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  date.setDate(date.getDate() + 7);
  state.text = date.toISOString();
}
