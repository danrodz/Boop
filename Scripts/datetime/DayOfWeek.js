/**
  {
    "api": 1,
    "name": "Get Day of Week",
    "description": "Gets day of week from date",
    "author": "Boop",
    "icon": "clock",
    "tags": "date,time,timestamp,convert,format"
  }
**/

function main(state) {
  const date = new Date(state.text.trim());
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  state.text = days[date.getDay()];
}
