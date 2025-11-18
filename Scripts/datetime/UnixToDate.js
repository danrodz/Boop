/**
  {
    "api": 1,
    "name": "Unix Timestamp to Date",
    "description": "Converts Unix timestamp to date",
    "author": "Boop",
    "icon": "clock",
    "tags": "date,time,timestamp,convert,format"
  }
**/

function main(state) {
  const timestamp = parseInt(state.text.trim()) * 1000;
  const date = new Date(timestamp);
  state.text = date.toISOString();
}
