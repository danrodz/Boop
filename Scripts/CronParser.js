/**
  {
    "api": 1,
    "name": "Cron Expression Parser",
    "description": "Explains cron expressions in plain English",
    "author": "Boop",
    "icon": "clock.arrow.circlepath",
    "tags": "cron,parse,schedule,explain"
  }
**/

function main(state) {
  try {
    const cron = state.text.trim();
    const parts = cron.split(/\s+/);

    if (parts.length < 5 || parts.length > 7) {
      state.postError("Invalid cron expression. Expected 5-7 parts: minute hour day month weekday [year] [seconds]");
      return;
    }

    const [minute, hour, day, month, weekday] = parts;

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    function describe(value, type) {
      if (value === '*') return `every ${type}`;
      if (value.includes('/')) {
        const [start, step] = value.split('/');
        return `every ${step} ${type}${step === '1' ? '' : 's'}`;
      }
      if (value.includes('-')) {
        const [start, end] = value.split('-');
        return `${type}s ${start}-${end}`;
      }
      if (value.includes(',')) {
        return `${type}s ${value}`;
      }
      return `${type} ${value}`;
    }

    let explanation = 'Runs ';

    // Build explanation
    const parts_desc = [];

    if (minute !== '*') {
      parts_desc.push(`at minute ${minute}`);
    }

    if (hour !== '*') {
      parts_desc.push(`at ${hour}:00`);
    } else if (minute !== '*') {
      parts_desc.push('of every hour');
    }

    if (day !== '*') {
      parts_desc.push(`on day ${day}`);
    }

    if (month !== '*') {
      const monthNum = parseInt(month);
      if (!isNaN(monthNum) && monthNum >= 1 && monthNum <= 12) {
        parts_desc.push(`in ${monthNames[monthNum - 1]}`);
      } else {
        parts_desc.push(`in month ${month}`);
      }
    }

    if (weekday !== '*') {
      const dayNum = parseInt(weekday);
      if (!isNaN(dayNum) && dayNum >= 0 && dayNum <= 6) {
        parts_desc.push(`on ${dayNames[dayNum]}`);
      } else {
        parts_desc.push(`on weekday ${weekday}`);
      }
    }

    if (parts_desc.length === 0) {
      explanation = 'Runs every minute';
    } else {
      explanation += parts_desc.join(', ');
    }

    // Add common patterns
    const patterns = {
      '0 * * * *': 'Runs every hour (at minute 0)',
      '0 0 * * *': 'Runs daily at midnight',
      '0 0 * * 0': 'Runs weekly on Sunday at midnight',
      '0 0 1 * *': 'Runs monthly on the 1st at midnight',
      '*/5 * * * *': 'Runs every 5 minutes',
      '*/15 * * * *': 'Runs every 15 minutes',
      '0 */2 * * *': 'Runs every 2 hours',
      '0 9 * * 1-5': 'Runs weekdays at 9:00 AM'
    };

    const pattern = parts.slice(0, 5).join(' ');
    if (patterns[pattern]) {
      explanation = patterns[pattern];
    }

    state.text = `Cron: ${cron}\n\n${explanation}`;

  } catch (error) {
    state.postError("Failed to parse cron: " + error.message);
  }
}
