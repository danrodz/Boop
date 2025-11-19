/**
  {
    "api": 1,
    "name": "Keyword Extractor",
    "description": "Extract most frequent keywords from text",
    "author": "Boop",
    "icon": "key",
    "tags": "keyword,extract,frequency,nlp,text"
  }
**/

function main(state) {
  try {
    const text = state.text.toLowerCase();

    // Common stop words to ignore
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who', 'when', 'where', 'why', 'how']);

    // Extract words
    const words = text.match(/\b[a-z]+\b/g) || [];

    // Count frequencies
    const frequency = {};
    for (const word of words) {
      if (!stopWords.has(word) && word.length > 3) {
        frequency[word] = (frequency[word] || 0) + 1;
      }
    }

    // Sort by frequency
    const sorted = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    if (sorted.length === 0) {
      state.postError("No significant keywords found");
      return;
    }

    const result = [
      'Top Keywords:',
      '',
      ...sorted.map(([word, count], i) => `${i + 1}. ${word} (${count})`),
      '',
      `Total unique keywords: ${Object.keys(frequency).length}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error extracting keywords: " + error.message);
  }
}
