/**
  {
    "api": 1,
    "name": "Word Frequency Analyzer",
    "description": "Analyze and visualize word frequency distribution",
    "author": "Boop",
    "icon": "chart.bar.xaxis",
    "tags": "word,frequency,analysis,statistics,nlp"
  }
**/

function main(state) {
  try {
    const text = state.text.toLowerCase();
    const words = text.match(/\b[a-z]+\b/g) || [];

    if (words.length === 0) {
      state.postError("No words found");
      return;
    }

    // Count frequencies
    const frequency = {};
    for (const word of words) {
      frequency[word] = (frequency[word] || 0) + 1;
    }

    // Sort by frequency
    const sorted = Object.entries(frequency).sort((a, b) => b[1] - a[1]);

    // Get top 15
    const top15 = sorted.slice(0, 15);

    // Create simple bar chart
    const maxCount = top15[0][1];
    const barWidth = 40;

    const chart = top15.map(([word, count]) => {
      const barLength = Math.round((count / maxCount) * barWidth);
      const bar = '█'.repeat(barLength);
      return `${word.padEnd(15)} ${bar} ${count}`;
    });

    const result = [
      'Word Frequency Analysis:',
      '',
      ...chart,
      '',
      `Total words: ${words.length}`,
      `Unique words: ${sorted.length}`,
      `Vocabulary richness: ${(sorted.length / words.length * 100).toFixed(2)}%`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error analyzing word frequency: " + error.message);
  }
}
