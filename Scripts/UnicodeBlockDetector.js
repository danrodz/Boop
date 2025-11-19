/**
  {
    "api": 1,
    "name": "Unicode Block Detector",
    "description": "Detect Unicode blocks in text",
    "author": "Boop",
    "icon": "square.grid.3x3",
    "tags": "unicode,block,script,detect"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const blocks = {};

    function getBlock(code) {
      if (code < 0x0080) return 'Basic Latin';
      if (code < 0x0100) return 'Latin-1 Supplement';
      if (code < 0x0180) return 'Latin Extended-A';
      if (code < 0x0250) return 'Latin Extended-B';
      if (code < 0x02B0) return 'IPA Extensions';
      if (code < 0x0300) return 'Spacing Modifier Letters';
      if (code < 0x0370) return 'Combining Diacritical Marks';
      if (code < 0x0400) return 'Greek and Coptic';
      if (code < 0x0500) return 'Cyrillic';
      if (code < 0x0530) return 'Cyrillic Supplement';
      if (code < 0x0590) return 'Armenian';
      if (code < 0x0600) return 'Hebrew';
      if (code < 0x0700) return 'Arabic';
      if (code < 0x0750) return 'Syriac';
      if (code < 0x0780) return 'Arabic Supplement';
      if (code >= 0x0E00 && code < 0x0E80) return 'Thai';
      if (code >= 0x1100 && code < 0x1200) return 'Hangul Jamo';
      if (code >= 0x4E00 && code <= 0x9FFF) return 'CJK Unified Ideographs';
      if (code >= 0xAC00 && code <= 0xD7AF) return 'Hangul Syllables';
      if (code >= 0x1F300 && code <= 0x1F5FF) return 'Miscellaneous Symbols and Pictographs';
      if (code >= 0x1F600 && code <= 0x1F64F) return 'Emoticons';
      if (code >= 0x1F680 && code <= 0x1F6FF) return 'Transport and Map Symbols';
      if (code >= 0x1F900 && code <= 0x1F9FF) return 'Supplemental Symbols and Pictographs';
      if (code >= 0x2000 && code < 0x2070) return 'General Punctuation';
      if (code >= 0x2070 && code < 0x20A0) return 'Superscripts and Subscripts';
      if (code >= 0x20A0 && code < 0x20D0) return 'Currency Symbols';
      return 'Other';
    }

    for (let char of text) {
      const code = char.charCodeAt(0);
      const block = getBlock(code);
      blocks[block] = (blocks[block] || 0) + 1;
    }

    let result = `Text length: ${text.length} characters\n\n`;
    result += `=== UNICODE BLOCKS ===\n\n`;

    const sorted = Object.entries(blocks).sort((a, b) => b[1] - a[1]);

    for (let [block, count] of sorted) {
      const percentage = ((count / text.length) * 100).toFixed(1);
      result += `${block.padEnd(40)} ${count.toString().padStart(5)} (${percentage}%)\n`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Failed to detect blocks: " + error.message);
  }
}
