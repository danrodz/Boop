/**
  {
    "api": 1,
    "name": "Count Occurrences",
    "description": "Counts occurrences of each line (frequency)",
    "author": "Boop",
    "icon": "chart.bar.fill",
    "tags": "count,frequency,occurrences,statistics"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const counts = {};

  for (const line of lines) {
    counts[line] = (counts[line] || 0) + 1;
  }

  // Sort by count descending
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

  let result = 'LINE FREQUENCY\n\n';
  result += `Total lines: ${lines.length}\n`;
  result += `Unique lines: ${sorted.length}\n\n`;

  sorted.forEach(([line, count], i) => {
    const displayLine = line.length > 50 ? line.substring(0, 50) + '...' : line;
    result += `${count}x: ${displayLine || '(empty line)'}\n`;
  });

  state.text = result;
}
