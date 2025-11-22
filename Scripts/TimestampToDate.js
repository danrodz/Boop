/**
  {
    "api": 1,
    "name": "Timestamp to Date",
    "description": "Converts Unix timestamp to human-readable date",
    "author": "Boop",
    "icon": "calendar",
    "tags": "timestamp,unix,date,time,convert"
  }
**/

function main(state) {
  let ts = parseInt(state.text.trim());
  
  if (isNaN(ts)) {
    state.postError("Invalid timestamp");
    return;
  }
  
  // Auto-detect milliseconds vs seconds
  if (ts > 9999999999) {
    ts = Math.floor(ts / 1000);
  }
  
  const date = new Date(ts * 1000);
  
  if (isNaN(date.getTime())) {
    state.postError("Invalid timestamp");
    return;
  }
  
  const iso = date.toISOString();
  const local = date.toLocaleString();
  const utc = date.toUTCString();
  
  state.text = `ISO: ${iso}\nLocal: ${local}\nUTC: ${utc}`;
  state.postInfo("Timestamp converted");
}
