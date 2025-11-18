/**
  {
    "api": 1,
    "name": "Date to Unix Timestamp",
    "description": "Converts date to Unix timestamp",
    "author": "Boop",
    "icon": "clock",
    "tags": "date,time,timestamp,convert,format"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  state.text = String(Math.floor(date.getTime() / 1000));
}
