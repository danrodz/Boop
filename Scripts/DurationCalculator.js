/**
  {
    "api": 1,
    "name": "Duration Calculator",
    "description": "Calculate duration between two times/dates",
    "author": "Boop",
    "icon": "timer",
    "tags": "duration,time,calculate,difference"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.postError("Enter two timestamps/dates (one per line)");
      return;
    }

    const date1 = new Date(lines[0]);
    const date2 = new Date(lines[1]);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      state.postError("Invalid date format");
      return;
    }

    const diffMs = Math.abs(date2 - date1);
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffWeek = Math.floor(diffDay / 7);
    const diffMonth = Math.floor(diffDay / 30.44);
    const diffYear = Math.floor(diffDay / 365.25);

    // Calculate components
    const days = diffDay % 365;
    const hours = diffHour % 24;
    const minutes = diffMin % 60;
    const seconds = diffSec % 60;

    let result = `From: ${date1.toISOString()}\n`;
    result += `To:   ${date2.toISOString()}\n\n`;
    result += `=== DURATION ===\n`;
    result += `${diffYear} years, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds\n\n`;
    result += `=== TOTAL ===\n`;
    result += `Years: ${diffYear}\n`;
    result += `Months: ${diffMonth}\n`;
    result += `Weeks: ${diffWeek}\n`;
    result += `Days: ${diffDay}\n`;
    result += `Hours: ${diffHour}\n`;
    result += `Minutes: ${diffMin}\n`;
    result += `Seconds: ${diffSec}\n`;
    result += `Milliseconds: ${diffMs}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
