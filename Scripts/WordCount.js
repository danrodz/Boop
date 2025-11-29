/**
  {
    "api": 1,
    "name": "Word Count Statistics",
    "description": "Count words, characters, lines, and reading time",
    "author": "Boop",
    "icon": "info",
    "tags": "word,count,statistics,text,analysis"
  }
**/

function main(state) {
  const text = state.text;

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    lines: text.split('\n').length,
    paragraphs: text.split(/\n\n+/).filter(p => p.trim()).length,
    sentences: text.split(/[.!?]+/).filter(s => s.trim()).length,
    readingTime: Math.ceil((text.trim().split(/\s+/).length || 0) / 200) // ~200 words per minute
  };

  let output = `Text Statistics:\n\n`;
  output += `Characters: ${stats.characters.toLocaleString()}\n`;
  output += `Characters (no spaces): ${stats.charactersNoSpaces.toLocaleString()}\n`;
  output += `Words: ${stats.words.toLocaleString()}\n`;
  output += `Lines: ${stats.lines.toLocaleString()}\n`;
  output += `Paragraphs: ${stats.paragraphs}\n`;
  output += `Sentences: ${stats.sentences}\n`;
  output += `Reading time: ~${stats.readingTime} min\n`;

  // Average word length
  if (stats.words > 0) {
    const avgWordLength = (stats.charactersNoSpaces / stats.words).toFixed(1);
    output += `Avg word length: ${avgWordLength} characters`;
  }

  state.text = output;
}
