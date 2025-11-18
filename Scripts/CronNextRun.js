/**
  {
    "api": 1,
    "name": "Cron Next Run Calculator",
    "description": "Calculate next 5 run times for cron expression",
    "author": "Boop",
    "icon": "calendar.badge.clock",
    "tags": "cron,schedule,next,run,time"
  }
**/

function main(state) {
  try {
    const cron = state.text.trim();
    const parts = cron.split(/\s+/);

    if (parts.length < 5) {
      state.postError("Format: minute hour day month weekday");
      return;
    }

    const [minute, hour, day, month, weekday] = parts;

    function getNextRuns(count = 5) {
      const runs = [];
      const now = new Date();
      let current = new Date(now);

      while (runs.length < count) {
        current = new Date(current.getTime() + 60000); // Add 1 minute

        const matches = (
          (minute === '*' || parseInt(minute) === current.getMinutes()) &&
          (hour === '*' || parseInt(hour) === current.getHours()) &&
          (day === '*' || parseInt(day) === current.getDate()) &&
          (month === '*' || parseInt(month) === current.getMonth() + 1) &&
          (weekday === '*' || parseInt(weekday) === current.getDay())
        );

        if (matches) {
          runs.push(new Date(current));
        }

        // Safety limit
        if (current - now > 365 * 24 * 60 * 60 * 1000) break;
      }

      return runs;
    }

    const nextRuns = getNextRuns();

    if (nextRuns.length === 0) {
      state.text = 'Could not calculate next runs.\nCron expression may be too specific.';
      return;
    }

    let result = `Cron: ${cron}\n\n`;
    result += 'Next 5 scheduled runs:\n';
    result += '─'.repeat(40) + '\n';

    for (let i = 0; i < nextRuns.length; i++) {
      const run = nextRuns[i];
      result += `${i + 1}. ${run.toLocaleString()}\n`;
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to calculate: " + error.message);
  }
}
