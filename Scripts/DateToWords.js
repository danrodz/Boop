/**
  {
    "api": 1,
    "name": "Date to Words",
    "description": "Convert date to human-readable words",
    "author": "Boop",
    "icon": "text.bubble",
    "tags": "date,words,human,readable"
  }
**/

function main(state) {
  try {
    const input = state.text.trim();
    const date = input.toLowerCase() === 'now' ? new Date() : new Date(input);

    if (isNaN(date.getTime())) {
      state.postError("Invalid date");
      return;
    }

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function getOrdinal(n) {
      const s = ['th', 'st', 'nd', 'rd'];
      const v = n % 100;
      return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const day = getOrdinal(date.getDate());
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;

    let result = `${dayOfWeek}, ${month} ${day}, ${year}\n`;
    result += `at ${hour12}:${String(minute).padStart(2, '0')} ${ampm}\n\n`;

    // Relative time
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      result += 'That\'s today!\n';
    } else if (diffDays === 1) {
      result += 'That was yesterday\n';
    } else if (diffDays === -1) {
      result += 'That\'s tomorrow\n';
    } else if (diffDays > 0) {
      result += `That was ${diffDays} days ago\n`;
    } else {
      result += `That's in ${Math.abs(diffDays)} days\n`;
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to convert: " + error.message);
  }
}
