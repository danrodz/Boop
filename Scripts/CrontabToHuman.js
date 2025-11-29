/**
  {
    "api": 1,
    "name": "Crontab to Human Readable",
    "description": "Convert cron expression to human-readable text",
    "author": "Boop",
    "icon": "clock.arrow.circlepath",
    "tags": "cron,crontab,schedule,human"
  }
**/

function main(state) {
  try {
    const cron = state.text.trim();
    const parts = cron.split(/\s+/);

    if (parts.length < 5) {
      state.postError("Format: minute hour day month weekday [command]");
      return;
    }

    const [minute, hour, day, month, weekday] = parts;

    function describe(value, type) {
      if (value === '*') return `every ${type}`;
      if (value.includes('/')) {
        const [, interval] = value.split('/');
        return `every ${interval} ${type}(s)`;
      }
      if (value.includes(',')) {
        return `at ${type}(s) ${value}`;
      }
      if (value.includes('-')) {
        const [start, end] = value.split('-');
        return `${type}(s) ${start} through ${end}`;
      }
      return `at ${type} ${value}`;
    }

    let result = 'Schedule: ';

    // Build description
    if (minute === '0' && hour === '0' && day === '*' && month === '*') {
      result += 'Daily at midnight';
    } else if (minute === '0' && hour !== '*' && day === '*' && month === '*') {
      result += `Daily at ${hour}:00`;
    } else {
      const parts = [];
      if (minute !== '*') parts.push(describe(minute, 'minute'));
      if (hour !== '*') parts.push(describe(hour, 'hour'));
      if (day !== '*') parts.push(describe(day, 'day'));
      if (month !== '*') parts.push(describe(month, 'month'));
      if (weekday !== '*') {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        parts.push(`on ${days[parseInt(weekday)] || 'day ' + weekday}`);
      }
      result += parts.join(', ');
    }

    result += '\n\nCron expression: ' + cron;

    state.text = result;
  } catch (error) {
    state.postError("Failed to parse cron: " + error.message);
  }
}
