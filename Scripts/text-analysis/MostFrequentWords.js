/**
  {
    "api": 1,
    "name": "Most Frequent Words",
    "description": "Shows top 10 most frequent words",
    "author": "Boop",
    "icon": "chart.bar",
    "tags": "frequency,words,statistics,analysis"
  }
**/

function main(state) {
  const words = state.text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq = {};

  for (let word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 10);
  const result = sorted.map(([word, count]) => `${word}: ${count}`).join('\n');
  state.text = result;
}
