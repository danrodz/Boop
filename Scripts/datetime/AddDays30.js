/**
  {
    "api": 1,
    "name": "Add 30 Days to Date",
    "description": "Adds 30 days to date",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,format,convert"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  date.setDate(date.getDate() + 30);
  state.text = date.toISOString();
}
