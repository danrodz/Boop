/**
  {
    "api": 1,
    "name": "RTL Text Converter",
    "description": "Add RTL (right-to-left) markers to text",
    "author": "Boop",
    "icon": "text.alignright",
    "tags": "rtl,righttoleft,arabic,hebrew,bidi"
  }
**/

function main(state) {
  try {
    const text = state.text;

    // Unicode control characters
    const RLM = '\u200F';  // Right-to-Left Mark
    const LRM = '\u200E';  // Left-to-Right Mark
    const RLE = '\u202B';  // Right-to-Left Embedding
    const PDF = '\u202C';  // Pop Directional Formatting
    const RLO = '\u202E';  // Right-to-Left Override

    let result = `=== RTL TEXT CONVERSIONS ===\n\n`;

    result += `1. With RLM markers:\n`;
    result += `${RLM}${text}${RLM}\n\n`;

    result += `2. With RLE/PDF embedding:\n`;
    result += `${RLE}${text}${PDF}\n\n`;

    result += `3. With RLO override:\n`;
    result += `${RLO}${text}${PDF}\n\n`;

    result += `=== HTML ===\n`;
    result += `<span dir="rtl">${text}</span>\n`;
    result += `<bdo dir="rtl">${text}</bdo>\n\n`;

    result += `=== CSS ===\n`;
    result += `direction: rtl;\n`;
    result += `unicode-bidi: embed;\n\n`;

    result += `=== UNICODE CODES ===\n`;
    result += `RLM: U+200F (&#8207;)\n`;
    result += `LRM: U+200E (&#8206;)\n`;
    result += `RLE: U+202B (&#8235;)\n`;
    result += `PDF: U+202C (&#8236;)`;

    state.text = result;
  } catch (error) {
    state.postError("Conversion failed: " + error.message);
  }
}
