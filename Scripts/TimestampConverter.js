/**
  {
    "api": 1,
    "name": "Timestamp Converter",
    "description": "Converts between different timestamp formats",
    "author": "Boop",
    "icon": "clock.arrow.2.circlepath",
    "tags": "timestamp,convert,date,time,unix,iso"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    let date;
    let inputType;

    // Try to detect input type
    if (/^\d+$/.test(input)) {
      // Unix timestamp (seconds or milliseconds)
      const num = parseInt(input);
      const isMilliseconds = num > 10000000000;
      date = new Date(isMilliseconds ? num : num * 1000);
      inputType = isMilliseconds ? 'Unix (ms)' : 'Unix (s)';
    } else {
      // Try parsing as date string
      date = new Date(input);
      inputType = 'Date string';
    }

    if (isNaN(date.getTime())) {
      state.postError("Invalid date/timestamp");
      return;
    }

    const unixSeconds = Math.floor(date.getTime() / 1000);
    const unixMillis = date.getTime();
    const iso = date.toISOString();
    const utc = date.toUTCString();
    const local = date.toLocaleString();

    const result = `TIMESTAMP CONVERTER

Input: ${input}
Detected as: ${inputType}

Unix (seconds): ${unixSeconds}
Unix (milliseconds): ${unixMillis}
ISO 8601: ${iso}
UTC: ${utc}
Local: ${local}

Day of week: ${date.toLocaleDateString('en-US', { weekday: 'long' })}
Day of year: ${Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000)}`;

    state.text = result;

  } catch (error) {
    state.postError("Failed to convert timestamp: " + error.message);
  }
}
