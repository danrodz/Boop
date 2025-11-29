/**
{
  "api": 1,
  "name": "Word Frequency Analysis",
  "description": "Shows frequency of each word",
  "author": "Boop",
  "icon": "chart.bar.xaxis",
  "tags": "frequency,word,analysis,count"
}
**/

function main(state) {
  const words = state.text.toLowerCase().match(/\b\w+\b/g) || [];
  const freq = {};

  for (const word of words) {
    freq[word] = (freq[word] || 0) + 1;
  }

  const sorted = Object.entries(freq).sort((a, b) => b[1] - a[1]);
  const result = sorted.map(([word, count]) => count + '\t' + word).join('\n');

  state.text = result;
}
