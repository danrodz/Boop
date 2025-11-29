/**
  {
    "api": 1,
    "name": "Duration Parser",
    "description": "Parses duration strings (1h30m, 2d4h) to various formats",
    "author": "Boop",
    "icon": "clock",
    "tags": "duration,time,parse,convert,interval"
  }
**/

function main(state) {
  var input = state.text.trim().toLowerCase();
  
  // Units in seconds
  var units = {
    ms: 0.001,
    s: 1, sec: 1, second: 1, seconds: 1,
    m: 60, min: 60, minute: 60, minutes: 60,
    h: 3600, hr: 3600, hour: 3600, hours: 3600,
    d: 86400, day: 86400, days: 86400,
    w: 604800, week: 604800, weeks: 604800,
    mo: 2592000, month: 2592000, months: 2592000,
    y: 31536000, year: 31536000, years: 31536000
  };
  
  var totalSeconds = 0;
  var pattern = /(\d+\.?\d*)\s*([a-z]+)/g;
  var match;
  var found = false;
  
  while ((match = pattern.exec(input)) !== null) {
    found = true;
    var value = parseFloat(match[1]);
    var unit = match[2];
    
    if (units[unit] !== undefined) {
      totalSeconds += value * units[unit];
    } else {
      state.postError("Unknown unit: " + unit);
      return;
    }
  }
  
  // Also try plain number (assume seconds)
  if (!found && /^\d+\.?\d*$/.test(input)) {
    totalSeconds = parseFloat(input);
    found = true;
  }
  
  if (!found) {
    state.postError("Could not parse duration. Try: 1h30m, 2d4h, 90s");
    return;
  }
  
  // Convert to various formats
  var ms = totalSeconds * 1000;
  var seconds = totalSeconds;
  var minutes = totalSeconds / 60;
  var hours = totalSeconds / 3600;
  var days = totalSeconds / 86400;
  
  // Human readable
  function humanize(secs) {
    var parts = [];
    var d = Math.floor(secs / 86400);
    if (d > 0) { parts.push(d + "d"); secs %= 86400; }
    var h = Math.floor(secs / 3600);
    if (h > 0) { parts.push(h + "h"); secs %= 3600; }
    var m = Math.floor(secs / 60);
    if (m > 0) { parts.push(m + "m"); secs %= 60; }
    if (secs > 0 || parts.length === 0) { parts.push(Math.round(secs) + "s"); }
    return parts.join(" ");
  }
  
  var result = [
    "Input: " + input,
    "",
    "Conversions:",
    "  Milliseconds: " + ms.toLocaleString(),
    "  Seconds: " + seconds.toLocaleString(),
    "  Minutes: " + minutes.toFixed(2),
    "  Hours: " + hours.toFixed(2),
    "  Days: " + days.toFixed(4),
    "",
    "Human: " + humanize(totalSeconds),
    "ISO 8601: PT" + Math.floor(hours) + "H" + Math.floor(minutes % 60) + "M" + Math.round(seconds % 60) + "S"
  ];
  
  state.text = result.join("\n");
  state.postInfo(humanize(totalSeconds));
}
