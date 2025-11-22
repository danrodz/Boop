/**
  {
    "api": 1,
    "name": "Date to Timestamp",
    "description": "Converts date string to Unix timestamp",
    "author": "Boop",
    "icon": "calendar",
    "tags": "date,timestamp,unix,time,convert"
  }
**/

function main(state) {
  var input = state.text.trim();
  var date = new Date(input);
  
  if (isNaN(date.getTime())) {
    state.postError("Invalid date format. Try: YYYY-MM-DD or ISO 8601");
    return;
  }
  
  var seconds = Math.floor(date.getTime() / 1000);
  var milliseconds = date.getTime();
  
  state.text = "Seconds: " + seconds + "\nMilliseconds: " + milliseconds;
  state.postInfo("Date: " + date.toISOString());
}
