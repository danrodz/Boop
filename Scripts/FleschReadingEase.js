/**
  {
    "api": 1,
    "name": "Flesch Reading Ease Score",
    "description": "Calculate Flesch Reading Ease readability score",
    "author": "Boop",
    "icon": "doc.text.magnifyingglass",
    "tags": "readability,flesch,reading,score"
  }
**/

function main(state) {
  try {
    const text = state.text;

    // Count sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Count words
    const words = text.trim().split(/\s+/).filter(w => w.length > 0).length;

    // Count syllables (simplified)
    function countSyllables(word) {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;

      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');

      const matches = word.match(/[aeiouy]{1,2}/g);
      return matches ? matches.length : 1;
    }

    const wordList = text.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const syllables = wordList.reduce((sum, word) => sum + countSyllables(word), 0);

    // Calculate Flesch Reading Ease
    const avgWordsPerSentence = words / sentences;
    const avgSyllablesPerWord = syllables / words;

    const score = 206.835 - (1.015 * avgWordsPerSentence) - (84.6 * avgSyllablesPerWord);
    const roundedScore = Math.round(score * 10) / 10;

    // Interpret score
    let interpretation;
    if (score >= 90) interpretation = 'Very Easy (5th grade)';
    else if (score >= 80) interpretation = 'Easy (6th grade)';
    else if (score >= 70) interpretation = 'Fairly Easy (7th grade)';
    else if (score >= 60) interpretation = 'Standard (8th-9th grade)';
    else if (score >= 50) interpretation = 'Fairly Difficult (10th-12th grade)';
    else if (score >= 30) interpretation = 'Difficult (College)';
    else interpretation = 'Very Difficult (College graduate)';

    let result = `Flesch Reading Ease: ${roundedScore}\n`;
    result += `Level: ${interpretation}\n\n`;
    result += `Sentences: ${sentences}\n`;
    result += `Words: ${words}\n`;
    result += `Syllables: ${syllables}\n`;
    result += `Avg words/sentence: ${avgWordsPerSentence.toFixed(1)}\n`;
    result += `Avg syllables/word: ${avgSyllablesPerWord.toFixed(1)}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to calculate score: " + error.message);
  }
}
