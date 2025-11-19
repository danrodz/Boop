/**
  {
    "api": 1,
    "name": "Character Width Calculator",
    "description": "Calculate display width of text (considering CJK, emoji)",
    "author": "Boop",
    "icon": "ruler",
    "tags": "character,width,cjk,emoji,display"
  }
**/

function main(state) {
  try {
    const text = state.text;
    let width = 0;
    let singleWidth = 0;
    let doubleWidth = 0;

    function getCharWidth(code) {
      // Fullwidth and halfwidth forms
      if (code >= 0xFF00 && code <= 0xFFEF) return 2;

      // CJK Unified Ideographs
      if (code >= 0x4E00 && code <= 0x9FFF) return 2;

      // Hangul
      if (code >= 0xAC00 && code <= 0xD7AF) return 2;
      if (code >= 0x1100 && code <= 0x11FF) return 2;

      // Hiragana and Katakana
      if (code >= 0x3040 && code <= 0x309F) return 2;
      if (code >= 0x30A0 && code <= 0x30FF) return 2;

      // CJK Symbols and Punctuation
      if (code >= 0x3000 && code <= 0x303F) return 2;

      // Enclosed CJK Letters and Months
      if (code >= 0x3200 && code <= 0x32FF) return 2;

      // CJK Compatibility
      if (code >= 0x3300 && code <= 0x33FF) return 2;

      // Emoji and symbols (most are wide)
      if (code >= 0x1F000) return 2;

      // Combining characters (zero width)
      if (code >= 0x0300 && code <= 0x036F) return 0;

      // Default: single width
      return 1;
    }

    for (let char of text) {
      const code = char.charCodeAt(0);
      const w = getCharWidth(code);
      width += w;
      if (w === 1) singleWidth++;
      else if (w === 2) doubleWidth++;
    }

    let result = `Text: ${text.substring(0, 50)}${text.length > 50 ? '...' : ''}\n\n`;
    result += `=== CHARACTER COUNT ===\n`;
    result += `Total characters: ${text.length}\n`;
    result += `Single-width: ${singleWidth}\n`;
    result += `Double-width: ${doubleWidth}\n\n`;
    result += `=== DISPLAY WIDTH ===\n`;
    result += `Estimated columns: ${width}\n\n`;
    result += `Note: This is an estimate. Actual display\n`;
    result += `width may vary based on font and terminal.`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to calculate width: " + error.message);
  }
}
