/**
  {
    "api": 1,
    "name": "ISO 8601 Date Parser",
    "description": "Parse and explain ISO 8601 date format",
    "author": "Boop",
    "icon": "calendar",
    "tags": "iso8601,date,parse,format"
  }
**/

function main(state) {
  try {
    const iso = state.text.trim();

    const date = new Date(iso);

    if (isNaN(date.getTime())) {
      state.postError("Invalid ISO 8601 date");
      return;
    }

    // Parse components
    let result = `ISO 8601: ${iso}\n\n`;
    result += `=== PARSED ===\n`;
    result += `Year: ${date.getUTCFullYear()}\n`;
    result += `Month: ${date.getUTCMonth() + 1}\n`;
    result += `Day: ${date.getUTCDate()}\n`;
    result += `Hour: ${date.getUTCHours()}\n`;
    result += `Minute: ${date.getUTCMinutes()}\n`;
    result += `Second: ${date.getUTCSeconds()}\n`;
    result += `Millisecond: ${date.getUTCMilliseconds()}\n\n`;

    result += `=== FORMATS ===\n`;
    result += `UTC: ${date.toUTCString()}\n`;
    result += `Local: ${date.toLocaleString()}\n`;
    result += `Date only: ${date.toISOString().split('T')[0]}\n`;
    result += `Time only: ${date.toISOString().split('T')[1]}\n\n`;

    result += `=== UNIX ===\n`;
    result += `Seconds: ${Math.floor(date.getTime() / 1000)}\n`;
    result += `Milliseconds: ${date.getTime()}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to parse: " + error.message);
  }
}
