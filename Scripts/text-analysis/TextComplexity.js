/**
  {
    "api": 1,
    "name": "Text Complexity Score",
    "description": "Calculates simple readability metrics",
    "author": "Boop",
    "icon": "chart.line.uptrend.xyaxis",
    "tags": "complexity,readability,statistics,analysis"
  }
**/

function main(state) {
  const words = state.text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = state.text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const syllables = words.reduce((sum, word) => sum + Math.max(1, word.replace(/[^aeiou]/gi, '').length), 0);

  const avgWordsPerSentence = (words.length / sentences.length).toFixed(1);
  const avgSyllablesPerWord = (syllables / words.length).toFixed(1);

  state.text = `Words: ${words.length}\nSentences: ${sentences.length}\nAvg words/sentence: ${avgWordsPerSentence}\nAvg syllables/word: ${avgSyllablesPerWord}`;
}
