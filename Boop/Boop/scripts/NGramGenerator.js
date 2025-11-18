/**
  {
    "api": 1,
    "name": "N-Gram Generator",
    "description": "Generate n-grams from text (default: bigrams)",
    "author": "Boop",
    "icon": "square.grid.3x3",
    "tags": "ngram,bigram,trigram,nlp,text"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');
    const text = lines[0].trim();
    const n = lines.length > 1 ? parseInt(lines[1]) : 2;

    if (!text) {
      state.postError("No text provided");
      return;
    }

    if (n < 1 || n > 5) {
      state.postError("N must be between 1 and 5");
      return;
    }

    const words = text.split(/\s+/);

    if (words.length < n) {
      state.postError(`Text must have at least ${n} words`);
      return;
    }

    const ngrams = [];
    for (let i = 0; i <= words.length - n; i++) {
      const ngram = words.slice(i, i + n).join(' ');
      ngrams.push(ngram);
    }

    // Count frequencies
    const frequency = {};
    for (const ngram of ngrams) {
      frequency[ngram] = (frequency[ngram] || 0) + 1;
    }

    // Sort by frequency
    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    const ngramName = ['', 'unigram', 'bigram', 'trigram', '4-gram', '5-gram'][n];

    const result = [
      `${ngramName}s (n=${n}):`,
      '',
      ...sorted.map(([ngram, count]) => `${count}x: ${ngram}`),
      '',
      `Total ${ngramName}s: ${ngrams.length}`,
      `Unique: ${Object.keys(frequency).length}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error generating n-grams: " + error.message);
  }
}
