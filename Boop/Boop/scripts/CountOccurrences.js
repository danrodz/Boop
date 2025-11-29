/**
{
  "api": 1,
  "name": "Count Occurrences",
  "description": "Count occurrences of each unique line",
  "author": "Boop",
  "icon": "number.circle",
  "tags": "count,occurrences,frequency"
}
**/

function main(state) {
  const lines = state.text.split('\n').filter(l => l.trim());
  const counts = {};

  for (const line of lines) {
    counts[line] = (counts[line] || 0) + 1;
  }

  const result = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([line, count]) => `${count}\t${line}`)
    .join('\n');

  state.text = result;
}
