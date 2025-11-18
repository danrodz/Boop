/**
  {
    "api": 1,
    "name": "Readability Score",
    "description": "Calculate Flesch Reading Ease and grade level",
    "author": "Boop",
    "icon": "book",
    "tags": "readability,flesch,grade,text,analysis"
  }
**/

function main(state) {
  try {
    const text = state.text.trim();

    if (!text) {
      state.postError("No text provided");
      return;
    }

    // Count sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;

    // Count words
    const words = text.split(/\s+/).filter(w => w.length > 0).length;

    // Count syllables (approximate)
    function countSyllables(word) {
      word = word.toLowerCase();
      if (word.length <= 3) return 1;
      word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
      word = word.replace(/^y/, '');
      const syllables = word.match(/[aeiouy]{1,2}/g);
      return syllables ? syllables.length : 1;
    }

    const wordList = text.split(/\s+/).filter(w => w.length > 0);
    const totalSyllables = wordList.reduce((sum, word) => sum + countSyllables(word), 0);

    // Flesch Reading Ease
    const avgSyllablesPerWord = totalSyllables / words;
    const avgWordsPerSentence = words / sentences;
    const fleschScore = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

    // Flesch-Kincaid Grade Level
    const gradeLevel = 0.39 * avgWordsPerSentence + 11.8 * avgSyllablesPerWord - 15.59;

    // Interpretation
    let interpretation = '';
    if (fleschScore >= 90) interpretation = 'Very Easy (5th grade)';
    else if (fleschScore >= 80) interpretation = 'Easy (6th grade)';
    else if (fleschScore >= 70) interpretation = 'Fairly Easy (7th grade)';
    else if (fleschScore >= 60) interpretation = 'Standard (8th-9th grade)';
    else if (fleschScore >= 50) interpretation = 'Fairly Difficult (10th-12th grade)';
    else if (fleschScore >= 30) interpretation = 'Difficult (College)';
    else interpretation = 'Very Difficult (College graduate)';

    const result = [
      `Flesch Reading Ease: ${fleschScore.toFixed(2)}`,
      `Interpretation: ${interpretation}`,
      ``,
      `Flesch-Kincaid Grade: ${gradeLevel.toFixed(2)}`,
      ``,
      `Statistics:`,
      `Words: ${words}`,
      `Sentences: ${sentences}`,
      `Syllables: ${totalSyllables}`,
      `Avg Words/Sentence: ${avgWordsPerSentence.toFixed(2)}`,
      `Avg Syllables/Word: ${avgSyllablesPerWord.toFixed(2)}`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error calculating readability: " + error.message);
  }
}
