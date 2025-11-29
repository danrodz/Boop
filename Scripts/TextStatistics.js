/**
  {
    "api": 1,
    "name": "Text Statistics",
    "description": "Comprehensive text analysis and statistics",
    "author": "Boop",
    "icon": "chart.bar.fill",
    "tags": "statistics,analysis,count,text,words"
  }
**/

function main(state) {
  const text = state.text;

  // Basic counts
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const lines = text.split('\n').length;
  const nonEmptyLines = text.split('\n').filter(l => l.trim()).length;

  // Words
  const words = text.match(/\b\w+\b/g) || [];
  const wordCount = words.length;
  const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;

  // Sentences (approximate)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim()).length;

  // Paragraphs
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim()).length;

  // Average word length
  const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
  const avgWordLength = wordCount > 0 ? (totalWordLength / wordCount).toFixed(2) : 0;

  // Reading time (average 200 words per minute)
  const readingTime = Math.ceil(wordCount / 200);
  const readingMinutes = Math.floor(readingTime);
  const readingSeconds = Math.round((readingTime - readingMinutes) * 60);

  // Speaking time (average 130 words per minute)
  const speakingTime = Math.ceil(wordCount / 130);
  const speakingMinutes = Math.floor(speakingTime);
  const speakingSeconds = Math.round((speakingTime - speakingMinutes) * 60);

  // Character types
  const letters = (text.match(/[a-zA-Z]/g) || []).length;
  const digits = (text.match(/\d/g) || []).length;
  const spaces = (text.match(/\s/g) || []).length;
  const punctuation = (text.match(/[.,!?;:'"()-]/g) || []).length;

  const result = `TEXT STATISTICS

Characters: ${chars.toLocaleString()}
  - Without spaces: ${charsNoSpaces.toLocaleString()}
  - Letters: ${letters.toLocaleString()}
  - Digits: ${digits.toLocaleString()}
  - Spaces: ${spaces.toLocaleString()}
  - Punctuation: ${punctuation.toLocaleString()}

Words: ${wordCount.toLocaleString()}
  - Unique: ${uniqueWords.toLocaleString()}
  - Average length: ${avgWordLength} characters

Lines: ${lines.toLocaleString()}
  - Non-empty: ${nonEmptyLines.toLocaleString()}

Sentences: ${sentences.toLocaleString()}
Paragraphs: ${paragraphs.toLocaleString()}

Reading time: ~${readingMinutes}m ${readingSeconds}s (200 wpm)
Speaking time: ~${speakingMinutes}m ${speakingSeconds}s (130 wpm)`;

  state.text = result;
}
