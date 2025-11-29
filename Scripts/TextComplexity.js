/**
  {
    "api": 1,
    "name": "Text Complexity Score",
    "description": "Analyze text complexity with multiple metrics",
    "author": "Boop",
    "icon": "chart.bar",
    "tags": "complexity,analysis,readability,metrics"
  }
**/

function main(state) {
  try {
    const text = state.text;

    // Basic counts
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    const charCount = text.replace(/\s/g, '').length;

    // Average word length
    const avgWordLength = charCount / wordCount;

    // Average sentence length
    const avgSentenceLength = wordCount / sentences;

    // Count long words (> 6 characters)
    const longWords = words.filter(w => w.length > 6).length;
    const longWordPercentage = (longWords / wordCount) * 100;

    // Count unique words
    const uniqueWords = new Set(words.map(w => w.toLowerCase())).size;
    const lexicalDiversity = uniqueWords / wordCount;

    // Calculate complexity score (0-100)
    let complexityScore = 0;
    complexityScore += Math.min(avgWordLength * 5, 30); // Max 30 points
    complexityScore += Math.min(avgSentenceLength * 2, 30); // Max 30 points
    complexityScore += Math.min(longWordPercentage, 20); // Max 20 points
    complexityScore += Math.min(lexicalDiversity * 20, 20); // Max 20 points

    // Interpret score
    let level;
    if (complexityScore < 30) level = 'Simple';
    else if (complexityScore < 50) level = 'Moderate';
    else if (complexityScore < 70) level = 'Complex';
    else level = 'Very Complex';

    let result = `Complexity Score: ${Math.round(complexityScore)}/100\n`;
    result += `Level: ${level}\n\n`;
    result += '=== METRICS ===\n';
    result += `Sentences: ${sentences}\n`;
    result += `Words: ${wordCount}\n`;
    result += `Characters: ${charCount}\n`;
    result += `Avg word length: ${avgWordLength.toFixed(1)}\n`;
    result += `Avg sentence length: ${avgSentenceLength.toFixed(1)}\n`;
    result += `Long words (>6 chars): ${longWordPercentage.toFixed(1)}%\n`;
    result += `Lexical diversity: ${(lexicalDiversity * 100).toFixed(1)}%`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to analyze complexity: " + error.message);
  }
}
