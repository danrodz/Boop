/**
  {
    "api": 1,
    "name": "Timezone Converter",
    "description": "Converts times between timezones (format: TIME from TZ to TZ)",
    "author": "Boop",
    "icon": "globe",
    "tags": "timezone,time,convert,utc,zone"
  }
**/

function main(state) {
  // Common timezone offsets
  var timezones = {
    // UTC
    utc: 0, gmt: 0, z: 0,
    // US
    pst: -8, pdt: -7, mst: -7, mdt: -6, cst: -6, cdt: -5, est: -5, edt: -4,
    // Europe
    wet: 0, cet: 1, cest: 2, eet: 2, eest: 3,
    // Asia
    ist: 5.5, jst: 9, kst: 9, cst_china: 8, hkt: 8, sgt: 8,
    // Australia
    awst: 8, acst: 9.5, aest: 10, aedt: 11,
    // Others
    nzst: 12, nzdt: 13
  };
  
  var input = state.text.trim().toLowerCase();
  
  // Parse format: 14:30 PST to EST or 2:30pm pst to est
  var pattern = /(\d{1,2}):?(\d{2})?\s*(am|pm)?\s*(\w+)\s*(?:to|->|in)\s*(\w+)/i;
  var match = input.match(pattern);
  
  if (!match) {
    var zones = Object.keys(timezones).join(", ");
    state.postError("Format: TIME FROM to TO\nExample: 14:30 PST to EST\n\nSupported zones: " + zones);
    return;
  }
  
  var hours = parseInt(match[1]);
  var minutes = parseInt(match[2] || "0");
  var ampm = match[3];
  var fromTz = match[4].toLowerCase().replace(/\s+/g, "_");
  var toTz = match[5].toLowerCase().replace(/\s+/g, "_");
  
  // Convert 12-hour to 24-hour if needed
  if (ampm === "pm" && hours !== 12) hours += 12;
  if (ampm === "am" && hours === 12) hours = 0;
  
  // Get offsets
  var fromOffset = timezones[fromTz];
  var toOffset = timezones[toTz];
  
  if (fromOffset === undefined) {
    state.postError("Unknown timezone: " + fromTz);
    return;
  }
  if (toOffset === undefined) {
    state.postError("Unknown timezone: " + toTz);
    return;
  }
  
  // Convert
  var totalMinutes = hours * 60 + minutes;
  var utcMinutes = totalMinutes - (fromOffset * 60);
  var targetMinutes = utcMinutes + (toOffset * 60);
  
  // Handle day overflow
  var dayOffset = 0;
  while (targetMinutes < 0) { targetMinutes += 1440; dayOffset--; }
  while (targetMinutes >= 1440) { targetMinutes -= 1440; dayOffset++; }
  
  var targetHours = Math.floor(targetMinutes / 60);
  var targetMins = Math.round(targetMinutes % 60);
  
  function formatTime(h, m) {
    var h12 = h % 12 || 12;
    var ampm = h >= 12 ? "PM" : "AM";
    return String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0") + 
           " (" + h12 + ":" + String(m).padStart(2, "0") + " " + ampm + ")";
  }
  
  var dayNote = "";
  if (dayOffset > 0) dayNote = " (next day)";
  if (dayOffset < 0) dayNote = " (previous day)";
  
  state.text = fromTz.toUpperCase() + ": " + formatTime(hours, minutes) + "\n" +
               toTz.toUpperCase() + ": " + formatTime(targetHours, targetMins) + dayNote + "\n" +
               "UTC: " + formatTime(Math.floor((utcMinutes + 1440) % 1440 / 60), Math.round(utcMinutes % 60));
  
  state.postInfo("Converted " + fromTz.toUpperCase() + " to " + toTz.toUpperCase());
}
