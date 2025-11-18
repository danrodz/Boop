/**
  {
    "api": 1,
    "name": "Unix Timestamp Converter",
    "description": "Convert between Unix timestamp and human-readable date",
    "author": "Boop",
    "icon": "clock",
    "tags": "unix,timestamp,epoch,date,convert"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    let timestamp, date;

    if (/^\d+$/.test(input)) {
      // Input is timestamp
      timestamp = parseInt(input);

      // Detect if milliseconds (13 digits) or seconds (10 digits)
      if (input.length > 11) {
        date = new Date(timestamp);
      } else {
        date = new Date(timestamp * 1000);
      }

      let result = `Timestamp: ${timestamp}\n\n`;
      result += `UTC: ${date.toUTCString()}\n`;
      result += `ISO: ${date.toISOString()}\n`;
      result += `Local: ${date.toLocaleString()}\n\n`;
      result += `Components:\n`;
      result += `Year: ${date.getUTCFullYear()}\n`;
      result += `Month: ${date.getUTCMonth() + 1}\n`;
      result += `Day: ${date.getUTCDate()}\n`;
      result += `Hour: ${date.getUTCHours()}\n`;
      result += `Minute: ${date.getUTCMinutes()}\n`;
      result += `Second: ${date.getUTCSeconds()}`;

      state.text = result;
    } else {
      // Input is date string
      date = new Date(input);

      if (isNaN(date.getTime())) {
        state.postError("Invalid date format");
        return;
      }

      const timestampSec = Math.floor(date.getTime() / 1000);
      const timestampMs = date.getTime();

      let result = `Date: ${date.toUTCString()}\n\n`;
      result += `Unix timestamp (seconds): ${timestampSec}\n`;
      result += `Unix timestamp (milliseconds): ${timestampMs}\n\n`;
      result += `Relative: ${getRelativeTime(date)}`;

      state.text = result;
    }

    function getRelativeTime(date) {
      const now = new Date();
      const diffMs = now - date;
      const diffSec = Math.floor(diffMs / 1000);
      const diffMin = Math.floor(diffSec / 60);
      const diffHour = Math.floor(diffMin / 60);
      const diffDay = Math.floor(diffHour / 24);

      if (diffSec < 60) return `${diffSec} seconds ago`;
      if (diffMin < 60) return `${diffMin} minutes ago`;
      if (diffHour < 24) return `${diffHour} hours ago`;
      return `${diffDay} days ago`;
    }
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
