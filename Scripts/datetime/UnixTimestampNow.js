/**
  {
    "api": 1,
    "name": "Current Unix Timestamp",
    "description": "Generates current Unix timestamp",
    "author": "Boop",
    "icon": "clock",
    "tags": "date,time,timestamp,convert,format"
  }
**/

function main(state) {
  state.insert(String(Math.floor(Date.now() / 1000)));
}
