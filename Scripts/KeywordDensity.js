/**
  {
    "api": 1,
    "name": "Keyword Density",
    "description": "Calculate keyword density and frequency",
    "author": "Boop",
    "icon": "magnifyingglass.circle",
    "tags": "keyword,density,frequency,seo"
  }
**/

function main(state) {
  try {
    const text = state.text.toLowerCase();

    // Remove punctuation and split into words
    const words = text.replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2);

    // Count word frequency
    const frequency = {};
    for (let word of words) {
      frequency[word] = (frequency[word] || 0) + 1;
    }

    // Sort by frequency
    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20); // Top 20

    // Calculate total
    const totalWords = words.length;

    let result = `Total words: ${totalWords}\n`;
    result += `Unique words: ${Object.keys(frequency).length}\n\n`;
    result += 'Top keywords:\n';
    result += '─'.repeat(40) + '\n';

    for (let [word, count] of sorted) {
      const density = ((count / totalWords) * 100).toFixed(2);
      result += `${word.padEnd(20)} ${count.toString().padStart(5)} (${density}%)\n`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Failed to analyze keywords: " + error.message);
  }
}
