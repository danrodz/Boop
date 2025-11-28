/**
  {
    "api": 1,
    "name": "Cron to English",
    "description": "Convert cron expression to readable English",
    "author": "Boop",
    "icon": "clock",
    "tags": "cron,schedule,time,convert,explain"
  }
**/

function main(state) {
  try {
    const cron = state.text.trim();
    const parts = cron.split(/\s+/);

    if (parts.length < 5) {
      state.postError("Invalid cron expression. Format: minute hour day month weekday");
      return;
    }

    const [minute, hour, day, month, weekday] = parts;

    function parseField(value, type) {
      if (value === '*') return `every ${type}`;
      if (value.includes('/')) {
        const [, interval] = value.split('/');
        return `every ${interval} ${type}(s)`;
      }
      if (value.includes(',')) {
        return `on ${type}(s) ${value.split(',').join(', ')}`;
      }
      if (value.includes('-')) {
        const [start, end] = value.split('-');
        return `${type}(s) ${start} through ${end}`;
      }
      return `${type} ${value}`;
    }

    const parts_readable = [];

    if (minute !== '*') parts_readable.push(parseField(minute, 'minute'));
    if (hour !== '*') parts_readable.push(parseField(hour, 'hour'));
    if (day !== '*') parts_readable.push(parseField(day, 'day'));
    if (month !== '*') parts_readable.push(parseField(month, 'month'));
    if (weekday !== '*') parts_readable.push(parseField(weekday, 'weekday'));

    if (parts_readable.length === 0) {
      state.text = "Runs every minute";
    } else {
      state.text = "Runs at " + parts_readable.join(', ');
    }
  } catch (error) {
    state.postError("Error converting cron: " + error.message);
  }
}
