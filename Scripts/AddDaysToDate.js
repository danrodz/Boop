/**
  {
    "api": 1,
    "name": "Add Days to Date",
    "description": "Adds/subtracts days from a date",
    "author": "Boop",
    "icon": "calendar.badge.plus",
    "tags": "date,add,days,calculate"
  }
**/

function main(state) {
  try {
    const lines = state.text.trim().split('\n');

    if (lines.length < 2) {
      state.postError("Line 1: date, Line 2: number of days (+/-)");
      return;
    }

    const date = new Date(lines[0].trim());
    const days = parseInt(lines[1].trim());

    if (isNaN(date.getTime())) {
      state.postError("Invalid date format on line 1");
      return;
    }

    if (isNaN(days)) {
      state.postError("Invalid number on line 2");
      return;
    }

    const result = new Date(date);
    result.setDate(result.getDate() + days);

    state.text = `DATE CALCULATOR

Original: ${date.toDateString()}
${days >= 0 ? 'Added' : 'Subtracted'}: ${Math.abs(days)} days
Result: ${result.toDateString()}

ISO: ${result.toISOString().split('T')[0]}
Day of week: ${result.toLocaleDateString('en-US', { weekday: 'long' })}`;

  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
