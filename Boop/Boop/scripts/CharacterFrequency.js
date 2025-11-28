/**
{
  "api": 1,
  "name": "Character Frequency Analysis",
  "description": "Shows frequency of each character",
  "author": "Boop",
  "icon": "chart.bar",
  "tags": "frequency,character,analysis,statistics"
}
**/

function main(state) {
  const freq = {};
  for (const char of state.text) {
    freq[char] = (freq[char] || 0) + 1;
  }

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const result = sorted.map(([char, count]) => {
    const display = char === '\n' ? '\\n' : char === '\t' ? '\\t' : char === ' ' ? 'SPACE' : char;
    return count + '\t' + display;
  }).join('\n');

  state.text = result;
}
