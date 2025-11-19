/**
  {
    "api": 1,
    "name": "Hex Dump",
    "description": "Create hex dump view of text/data",
    "author": "Boop",
    "icon": "square.grid.3x3",
    "tags": "hex,dump,binary,hexdump"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const bytes = [];

    // Convert text to bytes
    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);

      if (code < 128) {
        bytes.push(code);
      } else if (code < 2048) {
        bytes.push(0xC0 | (code >> 6));
        bytes.push(0x80 | (code & 0x3F));
      } else if (code < 65536) {
        bytes.push(0xE0 | (code >> 12));
        bytes.push(0x80 | ((code >> 6) & 0x3F));
        bytes.push(0x80 | (code & 0x3F));
      } else {
        bytes.push(0xF0 | (code >> 18));
        bytes.push(0x80 | ((code >> 12) & 0x3F));
        bytes.push(0x80 | ((code >> 6) & 0x3F));
        bytes.push(0x80 | (code & 0x3F));
      }
    }

    let result = `=== HEX DUMP ===\n\n`;
    result += `Size: ${bytes.length} bytes\n`;
    result += `Text length: ${text.length} characters\n\n`;

    const bytesPerLine = 16;
    const maxLines = 64; // Limit output

    for (let i = 0; i < Math.min(bytes.length, maxLines * bytesPerLine); i += bytesPerLine) {
      // Address
      const address = i.toString(16).toUpperCase().padStart(8, '0');
      result += `${address}  `;

      // Hex bytes
      const lineBytes = bytes.slice(i, i + bytesPerLine);

      for (let j = 0; j < bytesPerLine; j++) {
        if (j < lineBytes.length) {
          result += lineBytes[j].toString(16).toUpperCase().padStart(2, '0') + ' ';
        } else {
          result += '   ';
        }

        if (j === 7) result += ' '; // Extra space in middle
      }

      result += ' |';

      // ASCII representation
      for (let j = 0; j < lineBytes.length; j++) {
        const byte = lineBytes[j];
        if (byte >= 32 && byte < 127) {
          result += String.fromCharCode(byte);
        } else {
          result += '.';
        }
      }

      result += '|\n';
    }

    if (bytes.length > maxLines * bytesPerLine) {
      const remaining = bytes.length - (maxLines * bytesPerLine);
      result += `\n... ${remaining} more bytes (${Math.ceil(remaining / bytesPerLine)} lines)\n`;
    }

    result += `\n=== BYTE ANALYSIS ===\n`;

    const printable = bytes.filter(b => b >= 32 && b < 127).length;
    const control = bytes.filter(b => b < 32).length;
    const extended = bytes.filter(b => b >= 127).length;

    result += `Printable: ${printable} (${((printable / bytes.length) * 100).toFixed(1)}%)\n`;
    result += `Control: ${control} (${((control / bytes.length) * 100).toFixed(1)}%)\n`;
    result += `Extended: ${extended} (${((extended / bytes.length) * 100).toFixed(1)}%)\n`;

    state.text = result;
  } catch (error) {
    state.postError("Hex dump failed: " + error.message);
  }
}
