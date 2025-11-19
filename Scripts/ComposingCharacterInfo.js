/**
  {
    "api": 1,
    "name": "Composing Character Info",
    "description": "Show combining/composing characters in text",
    "author": "Boop",
    "icon": "textformat.abc.dottedunderline",
    "tags": "unicode,combining,composing,diacritic"
  }
**/

function main(state) {
  try {
    const text = state.text;

    function isCombining(code) {
      return (code >= 0x0300 && code <= 0x036F) ||  // Combining Diacritical Marks
             (code >= 0x1AB0 && code <= 0x1AFF) ||  // Combining Diacritical Marks Extended
             (code >= 0x1DC0 && code <= 0x1DFF) ||  // Combining Diacritical Marks Supplement
             (code >= 0x20D0 && code <= 0x20FF) ||  // Combining Diacritical Marks for Symbols
             (code >= 0xFE20 && code <= 0xFE2F);    // Combining Half Marks
    }

    let result = `Text: ${text}\n`;
    result += `Length: ${text.length} code units\n\n`;

    result += `=== CHARACTER BREAKDOWN ===\n\n`;

    let combiningCount = 0;

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);
      const hex = code.toString(16).toUpperCase().padStart(4, '0');
      const isComb = isCombining(code);

      if (isComb) combiningCount++;

      result += `[${i}] ${text[i]} - U+${hex}`;

      if (isComb) {
        result += ' (COMBINING)';
      }

      result += '\n';
    }

    result += `\n=== SUMMARY ===\n`;
    result += `Total code units: ${text.length}\n`;
    result += `Combining characters: ${combiningCount}\n`;
    result += `Base characters: ${text.length - combiningCount}\n\n`;

    if (combiningCount > 0) {
      result += `Note: Combining characters modify the\n`;
      result += `preceding base character.`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Analysis failed: " + error.message);
  }
}
