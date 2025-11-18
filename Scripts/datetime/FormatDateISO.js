/**
  {
    "api": 1,
    "name": "Format Date (ISO)",
    "description": "Formats date as YYYY-MM-DD",
    "author": "Boop",
    "icon": "clock",
    "tags": "date,time,timestamp,convert,format"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  const formatted = date.toISOString().split('T')[0];
  state.text = formatted;
}
