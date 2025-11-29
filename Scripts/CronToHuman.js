/**
  {
    "api": 1,
    "name": "Cron to Human",
    "description": "Converts cron expressions to human-readable text",
    "author": "Boop",
    "icon": "clock",
    "tags": "cron,schedule,time,human,readable"
  }
**/

function main(state) {
  var cron = state.text.trim();
  var parts = cron.split(/\s+/);
  
  if (parts.length < 5 || parts.length > 6) {
    state.postError("Expected 5 or 6 fields: minute hour day month weekday [year]");
    return;
  }
  
  var minute = parts[0], hour = parts[1], day = parts[2], month = parts[3], weekday = parts[4];
  
  var monthNames = ["", "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];
  var dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  
  function parseField(field, names) {
    if (field === "*") return "every";
    if (field.indexOf("/") > -1) {
      var stepParts = field.split("/");
      return "every " + stepParts[1] + (names ? "" : " (starting from " + stepParts[0] + ")");
    }
    if (field.indexOf(",") > -1) {
      var vals = field.split(",").map(function(v) { return names ? names[parseInt(v)] || v : v; });
      return vals.join(", ");
    }
    if (field.indexOf("-") > -1) {
      var rangeParts = field.split("-");
      var from = names ? names[parseInt(rangeParts[0])] || rangeParts[0] : rangeParts[0];
      var to = names ? names[parseInt(rangeParts[1])] || rangeParts[1] : rangeParts[1];
      return from + " through " + to;
    }
    return names ? names[parseInt(field)] || field : field;
  }
  
  var result = [];
  
  // Time
  if (minute === "*" && hour === "*") {
    result.push("Every minute");
  } else if (minute === "0" && hour === "*") {
    result.push("Every hour");
  } else if (minute === "*") {
    result.push("Every minute during hour " + hour);
  } else if (hour === "*") {
    result.push("At minute " + minute + " of every hour");
  } else if (minute.indexOf("/") > -1) {
    result.push("Every " + minute.split("/")[1] + " minutes");
  } else if (hour.indexOf("/") > -1) {
    result.push("Every " + hour.split("/")[1] + " hours at minute " + minute);
  } else {
    var h = parseInt(hour);
    var period = h >= 12 ? "PM" : "AM";
    var h12 = h % 12 || 12;
    result.push("At " + h12 + ":" + (minute.length === 1 ? "0" : "") + minute + " " + period);
  }
  
  // Day/Month constraints
  if (day !== "*" && month !== "*") {
    result.push("on " + parseField(month, monthNames) + " " + parseField(day));
  } else if (day !== "*") {
    result.push("on day " + parseField(day) + " of the month");
  } else if (month !== "*") {
    result.push("in " + parseField(month, monthNames));
  }
  
  // Weekday
  if (weekday !== "*") {
    result.push("on " + parseField(weekday, dayNames));
  }
  
  state.text = cron + "\n\n" + result.join(" ");
  state.postInfo("Cron expression explained");
}
