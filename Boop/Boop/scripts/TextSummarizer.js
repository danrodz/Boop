/**
  {
    "api": 1,
    "name": "Text Summarizer",
    "description": "Extract key sentences from text (extractive summary)",
    "author": "Boop",
    "icon": "doc.text.below.ecg",
    "tags": "summary,summarize,extract,nlp"
  }
**/

function main(state) {
  try {
    const text = state.text.trim();

    // Split into sentences
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);

    if (sentences.length < 3) {
      state.postError("Text too short to summarize");
      return;
    }

    // Calculate sentence scores based on word frequency
    const words = text.toLowerCase().split(/\s+/);
    const wordFreq = {};

    for (const word of words) {
      if (word.length > 3) {
        wordFreq[word] = (wordFreq[word] || 0) + 1;
      }
    }

    // Score sentences
    const sentenceScores = sentences.map(sentence => {
      const sentenceWords = sentence.toLowerCase().split(/\s+/);
      let score = 0;

      for (const word of sentenceWords) {
        score += wordFreq[word] || 0;
      }

      return {
        text: sentence.trim(),
        score: score / sentenceWords.length
      };
    });

    // Get top sentences (30% of total, minimum 3)
    const summaryLength = Math.max(3, Math.ceil(sentences.length * 0.3));
    const topSentences = sentenceScores
      .sort((a, b) => b.score - a.score)
      .slice(0, summaryLength);

    // Sort back to original order
    const summary = topSentences
      .sort((a, b) => sentences.indexOf(a.text) - sentences.indexOf(b.text))
      .map(s => s.text)
      .join('. ') + '.';

    const result = [
      'Summary:',
      '',
      summary,
      '',
      `Original: ${sentences.length} sentences`,
      `Summary: ${summaryLength} sentences`,
      `Reduction: ${Math.round((1 - summaryLength / sentences.length) * 100)}%`
    ].join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Error summarizing text: " + error.message);
  }
}
