/**
  {
    "api": 1,
    "name": "Random Date Generator",
    "description": "Generate random dates (input: count or start_year end_year)",
    "author": "Boop",
    "icon": "calendar",
    "tags": "random,date,generate,mock,test"
  }
**/

function main(state) {
  try {
    const input = state.text.trim().split(/\s+/);
    let count = 10;
    let startYear = 2020;
    let endYear = 2024;

    if (input.length === 1 && !isNaN(input[0])) {
      count = parseInt(input[0]);
    } else if (input.length >= 2) {
      startYear = parseInt(input[0]);
      endYear = parseInt(input[1]);
      count = input[2] ? parseInt(input[2]) : 10;
    }

    if (count < 1 || count > 100) {
      state.postError("Count must be between 1 and 100");
      return;
    }

    const dates = [];

    for (let i = 0; i < count; i++) {
      const year = startYear + Math.floor(Math.random() * (endYear - startYear + 1));
      const month = Math.floor(Math.random() * 12);
      const day = Math.floor(Math.random() * 28) + 1; // Safe for all months

      const date = new Date(year, month, day);

      const formats = [
        date.toISOString().split('T')[0],
        date.toLocaleDateString('en-US'),
        date.toLocaleDateString('en-GB'),
        `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      ];

      dates.push(formats[Math.floor(Math.random() * formats.length)]);
    }

    state.text = dates.join('\n');
    state.postInfo(`Generated ${count} random date(s)`);
  } catch (error) {
    state.postError("Error generating dates: " + error.message);
  }
}
