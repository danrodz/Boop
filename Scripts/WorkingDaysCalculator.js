/**
  {
    "api": 1,
    "name": "Working Days Calculator",
    "description": "Calculate working days between two dates (excluding weekends)",
    "author": "Boop",
    "icon": "calendar.badge.minus",
    "tags": "working,business,days,calculate"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.postError("Enter two dates (one per line)");
      return;
    }

    const date1 = new Date(lines[0]);
    const date2 = new Date(lines[1]);

    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
      state.postError("Invalid date format");
      return;
    }

    // Ensure date1 is before date2
    const startDate = date1 < date2 ? new Date(date1) : new Date(date2);
    const endDate = date1 < date2 ? new Date(date2) : new Date(date1);

    let workingDays = 0;
    let totalDays = 0;
    let weekendDays = 0;

    const current = new Date(startDate);
    while (current <= endDate) {
      totalDays++;
      const dayOfWeek = current.getDay();

      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        // Not Sunday (0) or Saturday (6)
        workingDays++;
      } else {
        weekendDays++;
      }

      current.setDate(current.getDate() + 1);
    }

    let result = `From: ${startDate.toDateString()}\n`;
    result += `To: ${endDate.toDateString()}\n\n`;
    result += `=== DAYS ===\n`;
    result += `Total days: ${totalDays}\n`;
    result += `Working days: ${workingDays} (Mon-Fri)\n`;
    result += `Weekend days: ${weekendDays}\n\n`;
    result += `=== WEEKS ===\n`;
    result += `Full weeks: ${Math.floor(totalDays / 7)}\n`;
    result += `Remaining days: ${totalDays % 7}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
