/**
  {
    "api": 1,
    "name": "Current ISO Date",
    "description": "Generates current ISO 8601 date",
    "author": "Boop",
    "icon": "clock",
    "tags": "date,time,timestamp,convert,format"
  }
**/

function main(state) {
  state.insert(new Date().toISOString());
}
