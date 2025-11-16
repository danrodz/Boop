/**
{
  "api": 1,
  "name": "Text Statistics",
  "description": "Calculates detailed text statistics including characters, words, lines, sentences, and reading time.",
  "author": "Boop",
  "icon": "counter",
  "tags": "statistics,stats,count,words,characters,lines,sentences,reading"
}
**/

function main(input) {
  try {
    const text = input.text;

    if (!text || text.trim().length === 0) {
      input.postError('Empty text provided');
      return;
    }

    // Character counts
    const totalChars = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;

    // Line count
    const lines = text.split('\n');
    const lineCount = lines.length;
    const nonEmptyLines = lines.filter(line => line.trim().length > 0).length;

    // Word count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    const wordCount = words.length;

    // Sentence count (approximate - counts periods, exclamation marks, and question marks)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const sentenceCount = sentences.length;

    // Average word length
    const avgWordLength = wordCount > 0
      ? (words.reduce((sum, word) => sum + word.length, 0) / wordCount).toFixed(1)
      : 0;

    // Average sentence length
    const avgSentenceLength = sentenceCount > 0
      ? (wordCount / sentenceCount).toFixed(1)
      : 0;

    // Reading time (assuming average reading speed of 200 words per minute)
    const readingTimeRaw = wordCount / 200;
    const readingTimeMinutes = Math.ceil(readingTimeRaw);
    const readingTimeSeconds = Math.ceil(readingTimeRaw * 60);
    const readingTimeDisplay = readingTimeRaw >= 1
      ? `${readingTimeMinutes} min${readingTimeMinutes === 1 ? '' : 's'}`
      : `${readingTimeSeconds} sec${readingTimeSeconds === 1 ? '' : 's'}`;

    // Paragraph count (groups of non-empty lines separated by empty lines)
    let paragraphCount = 0;
    let inParagraph = false;
    for (let line of lines) {
      if (line.trim().length > 0) {
        if (!inParagraph) {
          paragraphCount++;
          inParagraph = true;
        }
      } else {
        inParagraph = false;
      }
    }

    // Build statistics message
    const stats = [
      `Characters: ${totalChars.toLocaleString()} (${charsNoSpaces.toLocaleString()} without spaces)`,
      `Words: ${wordCount.toLocaleString()}`,
      `Lines: ${lineCount.toLocaleString()} (${nonEmptyLines.toLocaleString()} non-empty)`,
      `Sentences: ${sentenceCount.toLocaleString()}`,
      `Paragraphs: ${paragraphCount.toLocaleString()}`,
      `Average word length: ${avgWordLength} characters`,
      `Average sentence length: ${avgSentenceLength} words`,
      `Estimated reading time: ${readingTimeDisplay}`
    ];

    input.postInfo(stats.join('\n'));

    // Keep original text unchanged
    // input.text remains the same
  } catch (error) {
    input.postError(`Error: ${error.message}`);
  }
}
