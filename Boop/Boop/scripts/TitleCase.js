/**
{
  "api": 1,
  "name": "Title Case",
  "description": "Converts text to title case with proper handling of articles and prepositions",
  "author":"danrodz",
  "icon": "capital",
  "tags": "title,case,capitalize,proper"
}
**/

function main(input) {
  try {
    let text = input.text.trim();

    if (text.length === 0) {
      input.postError("Input is empty");
      return;
    }

    // Words that should be lowercase (unless they're the first or last word)
    const smallWords = new Set([
      'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'from',
      'in', 'into', 'of', 'on', 'onto', 'or', 'the', 'to', 'with'
    ]);

    // Split into words while preserving whitespace
    const words = text.toLowerCase().split(/(\s+)/);

    let result = [];
    let wordIndex = 0; // Track actual word count (excluding whitespace)

    for (let i = 0; i < words.length; i++) {
      const word = words[i];

      // If it's whitespace, keep it as-is
      if (/^\s+$/.test(word)) {
        result.push(word);
        continue;
      }

      // Check if this is the first or last actual word
      const isFirstWord = wordIndex === 0;
      const isLastWord = i === words.length - 1 ||
                        (i < words.length - 2 && /^\s+$/.test(words.slice(i + 1).join('')));

      // Capitalize the word
      if (isFirstWord || isLastWord || !smallWords.has(word)) {
        result.push(word.charAt(0).toUpperCase() + word.slice(1));
      } else {
        result.push(word);
      }

      wordIndex++;
    }

    input.text = result.join('');
  } catch (error) {
    input.postError("Error converting to title case: " + error.message);
  }
}
