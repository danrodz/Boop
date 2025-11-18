/**
  {
    "api": 1,
    "name": "Date Add/Subtract",
    "description": "Add or subtract time from date (format: 2024-01-01 + 30 days)",
    "author": "Boop",
    "icon": "plus.forwardslash.minus",
    "tags": "date,add,subtract,calculate"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();

    // Parse format: "2024-01-01 + 30 days" or "now - 2 weeks"
    const match = input.match(/(.+?)\s*([+\-])\s*(\d+)\s*(days?|weeks?|months?|years?|hours?|minutes?)/i);

    if (!match) {
      state.postError("Format: DATE +/- N units (e.g., 2024-01-01 + 30 days)");
      return;
    }

    const dateStr = match[1].trim();
    const operator = match[2];
    const amount = parseInt(match[3]);
    const unit = match[4].toLowerCase().replace(/s$/, '');

    const date = dateStr.toLowerCase() === 'now' ? new Date() : new Date(dateStr);

    if (isNaN(date.getTime())) {
      state.postError("Invalid date");
      return;
    }

    const multiplier = operator === '+' ? 1 : -1;
    const newDate = new Date(date);

    switch (unit) {
      case 'minute':
        newDate.setMinutes(newDate.getMinutes() + (amount * multiplier));
        break;
      case 'hour':
        newDate.setHours(newDate.getHours() + (amount * multiplier));
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + (amount * multiplier));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (amount * 7 * multiplier));
        break;
      case 'month':
        newDate.setMonth(newDate.getMonth() + (amount * multiplier));
        break;
      case 'year':
        newDate.setFullYear(newDate.getFullYear() + (amount * multiplier));
        break;
    }

    let result = `Original: ${date.toISOString()}\n`;
    result += `Operation: ${operator} ${amount} ${unit}(s)\n`;
    result += `Result: ${newDate.toISOString()}\n\n`;
    result += `Local: ${newDate.toLocaleString()}\n`;
    result += `Unix: ${Math.floor(newDate.getTime() / 1000)}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
