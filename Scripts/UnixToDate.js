/**
  {
    "api": 1,
    "name": "Unix Timestamp to Date",
    "description": "Converts Unix timestamp to human-readable date (handles seconds/milliseconds)",
    "author": "Boop",
    "icon": "clock.fill",
    "tags": "timestamp,unix,date,convert,time"
  }
**/

function main(state) {
  try {
    let timestamp = parseInt(state.text.trim());

    if (isNaN(timestamp)) {
      state.postError("Invalid timestamp");
      return;
    }

    // Auto-detect if timestamp is in seconds or milliseconds
    // Timestamps > 10000000000 are likely in milliseconds
    const isMilliseconds = timestamp > 10000000000;
    const date = new Date(isMilliseconds ? timestamp : timestamp * 1000);

    const iso = date.toISOString();
    const local = date.toLocaleString();
    const relative = getRelativeTime(date);

    state.text = `ISO: ${iso}\nLocal: ${local}\nRelative: ${relative}\n\nTimestamp: ${timestamp} (${isMilliseconds ? 'milliseconds' : 'seconds'})`;
  } catch (error) {
    state.postError("Failed to convert timestamp: " + error.message);
  }
}

function getRelativeTime(date) {
  const now = new Date();
  const diff = now - date;
  const seconds = Math.floor(Math.abs(diff) / 1000);

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60
  };

  for (const [unit, secondsInUnit] of Object.entries(intervals)) {
    const count = Math.floor(seconds / secondsInUnit);
    if (count >= 1) {
      const suffix = count === 1 ? '' : 's';
      const direction = diff > 0 ? 'ago' : 'from now';
      return `${count} ${unit}${suffix} ${direction}`;
    }
  }

  return 'just now';
}
