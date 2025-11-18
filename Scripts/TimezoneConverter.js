/**
  {
    "api": 1,
    "name": "Timezone Converter",
    "description": "Convert time between timezones (format: 14:30 EST to PST)",
    "author": "Boop",
    "icon": "clock.arrow.circlepath",
    "tags": "timezone,time,convert,utc"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Parse format: "14:30 EST to PST" or "2:30pm EST to PST"
    const match = input.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)?\s*(\w+)\s+to\s+(\w+)/i);

    if (!match) {
      state.postError("Format: HH:MM TZ1 to TZ2 (e.g., 14:30 EST to PST)");
      return;
    }

    let hour = parseInt(match[1]);
    const minute = parseInt(match[2] || 0);
    const ampm = match[3]?.toLowerCase();
    const fromTZ = match[4].toUpperCase();
    const toTZ = match[5].toUpperCase();

    // Convert 12-hour to 24-hour
    if (ampm === 'pm' && hour !== 12) hour += 12;
    if (ampm === 'am' && hour === 12) hour = 0;

    // Timezone offsets from UTC
    const offsets = {
      'PST': -8, 'PDT': -7,
      'MST': -7, 'MDT': -6,
      'CST': -6, 'CDT': -5,
      'EST': -5, 'EDT': -4,
      'UTC': 0, 'GMT': 0,
      'CET': 1, 'CEST': 2,
      'IST': 5.5,
      'JST': 9,
      'AEST': 10, 'AEDT': 11
    };

    if (!offsets[fromTZ] || !offsets[toTZ]) {
      state.postError("Unsupported timezone. Use: PST, EST, UTC, etc.");
      return;
    }

    // Convert to UTC, then to target timezone
    const utcHour = hour - offsets[fromTZ];
    let targetHour = utcHour + offsets[toTZ];

    // Handle day overflow
    let dayOffset = 0;
    if (targetHour >= 24) {
      dayOffset = Math.floor(targetHour / 24);
      targetHour = targetHour % 24;
    } else if (targetHour < 0) {
      dayOffset = Math.ceil(targetHour / 24) - 1;
      targetHour = ((targetHour % 24) + 24) % 24;
    }

    const timeStr = `${String(Math.floor(targetHour)).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    const dayStr = dayOffset > 0 ? ` (+${dayOffset} day)` : dayOffset < 0 ? ` (${dayOffset} day)` : '';

    let result = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${fromTZ}\n`;
    result += `= ${timeStr} ${toTZ}${dayStr}\n\n`;
    result += `UTC offset difference: ${offsets[toTZ] - offsets[fromTZ]} hours`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
