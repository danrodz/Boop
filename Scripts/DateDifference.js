/**
  {
    "api": 1,
    "name": "Calculate Date Difference",
    "description": "Calculates difference between two dates",
    "author": "Boop",
    "icon": "calendar.badge.clock",
    "tags": "date,difference,calculate,days"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.postError("Enter two dates, one per line");
      return;
    }

    const date1 = new Date(lines[0].trim());
    const date2 = new Date(lines[1].trim());

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      state.postError("Invalid date format");
      return;
    }

    const diff = Math.abs(date2 - date1);
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30.44);
    const diffYears = Math.floor(diffDays / 365.25);

    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diff / (1000 * 60));
    const diffSeconds = Math.floor(diff / 1000);

    const earlier = date1 < date2 ? date1 : date2;
    const later = date1 < date2 ? date2 : date1;

    state.text = `DATE DIFFERENCE

From: ${earlier.toDateString()}
To: ${later.toDateString()}

Difference:
${diffYears} years
${diffMonths} months
${diffWeeks} weeks
${diffDays} days
${diffHours.toLocaleString()} hours
${diffMinutes.toLocaleString()} minutes
${diffSeconds.toLocaleString()} seconds`;

  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
