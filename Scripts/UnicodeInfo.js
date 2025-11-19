/**
  {
    "api": 1,
    "name": "Unicode Character Info",
    "description": "Get detailed info about Unicode character",
    "author": "Boop",
    "icon": "character",
    "tags": "unicode,character,info,codepoint"
  }
**/

function main(state) {
  try {
    const char = state.text.trim()[0];

    if (!char) {
      state.postError("Enter a character");
      return;
    }

    const code = char.charCodeAt(0);
    const hex = code.toString(16).toUpperCase().padStart(4, '0');

    let result = `Character: ${char}\n\n`;
    result += `=== ENCODING ===\n`;
    result += `Unicode: U+${hex}\n`;
    result += `Decimal: ${code}\n`;
    result += `Hex: 0x${hex}\n`;
    result += `Binary: ${code.toString(2).padStart(16, '0')}\n\n`;

    result += `=== HTML ===\n`;
    result += `Entity (decimal): &#${code};\n`;
    result += `Entity (hex): &#x${hex};\n\n`;

    result += `=== PROGRAMMING ===\n`;
    result += `JavaScript: \\u${hex}\n`;
    result += `Python: \\u${hex}\n`;
    result += `Java: \\u${hex}\n`;
    result += `C/C++: \\u${hex}\n\n`;

    result += `=== URL ===\n`;
    result += `Encoded: ${encodeURIComponent(char)}`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to get info: " + error.message);
  }
}
