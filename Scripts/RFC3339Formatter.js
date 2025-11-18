/**
  {
    "api": 1,
    "name": "RFC 3339 Date Formatter",
    "description": "Format date to RFC 3339 (internet date/time)",
    "author": "Boop",
    "icon": "calendar.badge.clock",
    "tags": "rfc3339,date,format,internet"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    const date = input.toLowerCase() === 'now' ? new Date() : new Date(input);

    if (isNaN(date.getTime())) {
      state.postError("Invalid date");
      return;
    }

    function pad(n) {
      return String(n).padStart(2, '0');
    }

    // RFC 3339 format with timezone
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1);
    const day = pad(date.getDate());
    const hour = pad(date.getHours());
    const minute = pad(date.getMinutes());
    const second = pad(date.getSeconds());

    const offset = -date.getTimezoneOffset();
    const offsetHours = pad(Math.floor(Math.abs(offset) / 60));
    const offsetMinutes = pad(Math.abs(offset) % 60);
    const offsetSign = offset >= 0 ? '+' : '-';

    const rfc3339 = `${year}-${month}-${day}T${hour}:${minute}:${second}${offsetSign}${offsetHours}:${offsetMinutes}`;
    const rfc3339UTC = date.toISOString();

    let result = `Input: ${input}\n\n`;
    result += `=== RFC 3339 ===\n`;
    result += `Local: ${rfc3339}\n`;
    result += `UTC: ${rfc3339UTC}\n\n`;
    result += `=== COMPONENTS ===\n`;
    result += `Date: ${year}-${month}-${day}\n`;
    result += `Time: ${hour}:${minute}:${second}\n`;
    result += `Timezone: ${offsetSign}${offsetHours}:${offsetMinutes}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to format: " + error.message);
  }
}
