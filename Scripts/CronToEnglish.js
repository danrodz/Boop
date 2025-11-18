/**
  {
    "api": 1,
    "name": "Cron Expression to English",
    "description": "Explain cron expression in plain English",
    "author": "Boop",
    "icon": "clock",
    "tags": "cron,explain,schedule,devops"
  }
**/

function main(state) {
  const cron = state.text.trim().split(/\s+/);

  if (cron.length < 5) {
    state.postError("Invalid cron expression. Expected: minute hour day month weekday");
    return;
  }

  const [minute, hour, day, month, weekday] = cron;

  let description = "Runs ";

  // Minute
  if (minute === '*') {
    description += "every minute";
  } else if (minute.includes('/')) {
    const interval = minute.split('/')[1];
    description += `every ${interval} minutes`;
  } else {
    description += `at minute ${minute}`;
  }

  // Hour
  if (hour !== '*') {
    if (hour.includes('/')) {
      const interval = hour.split('/')[1];
      description += ` every ${interval} hours`;
    } else {
      description += ` at ${hour}:00`;
    }
  }

  // Day of month
  if (day !== '*') {
    description += ` on day ${day} of the month`;
  }

  // Month
  if (month !== '*') {
    const months = ['', 'January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    description += ` in ${months[parseInt(month)] || month}`;
  }

  // Weekday
  if (weekday !== '*') {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    description += ` on ${days[parseInt(weekday)] || weekday}`;
  }

  state.text = description;
  state.postInfo("Explained cron expression");
}
