/**
  {
    "api": 1,
    "name": "Binary to Text",
    "description": "Convert binary/hex to text using different encodings",
    "author": "Boop",
    "icon": "01.square",
    "tags": "binary,hex,text,decode,encoding"
  }
**/

function main(state) {
  try {
    let input = state.text.trim();

    let result = `=== BINARY/HEX DECODER ===\n\n`;

    // Try binary (groups of 8 bits)
    if (/^[01\s]+$/.test(input)) {
      const binary = input.replace(/\s/g, '');

      if (binary.length % 8 === 0) {
        let text = '';

        for (let i = 0; i < binary.length; i += 8) {
          const byte = binary.substr(i, 8);
          const charCode = parseInt(byte, 2);
          text += String.fromCharCode(charCode);
        }

        result += `Input Format: Binary\n`;
        result += `Bits: ${binary.length}\n`;
        result += `Bytes: ${binary.length / 8}\n\n`;

        result += `=== DECODED TEXT ===\n`;
        result += text + '\n\n';

        result += `=== AS HEX ===\n`;
        let hex = '';
        for (let i = 0; i < binary.length; i += 8) {
          const byte = binary.substr(i, 8);
          hex += parseInt(byte, 2).toString(16).toUpperCase().padStart(2, '0') + ' ';
        }
        result += hex.trim();
      } else {
        result += `Error: Binary length (${binary.length}) is not divisible by 8`;
      }
    }
    // Try hex
    else if (/^[0-9A-Fa-f\s]+$/.test(input)) {
      const hex = input.replace(/\s/g, '');

      if (hex.length % 2 === 0) {
        let text = '';
        const bytes = [];

        for (let i = 0; i < hex.length; i += 2) {
          const byte = hex.substr(i, 2);
          const charCode = parseInt(byte, 16);
          bytes.push(charCode);
          text += String.fromCharCode(charCode);
        }

        result += `Input Format: Hexadecimal\n`;
        result += `Hex Length: ${hex.length} characters\n`;
        result += `Bytes: ${hex.length / 2}\n\n`;

        result += `=== DECODED TEXT ===\n`;
        result += text + '\n\n';

        result += `=== AS BINARY ===\n`;
        let binary = '';
        bytes.forEach((b, i) => {
          binary += b.toString(2).padStart(8, '0') + ' ';
          if ((i + 1) % 4 === 0) binary += '\n';
        });
        result += binary.trim() + '\n\n';

        result += `=== BYTE VALUES ===\n`;
        bytes.forEach((b, i) => {
          result += `[${i}] ${b} (0x${b.toString(16).toUpperCase().padStart(2, '0')}) = '${String.fromCharCode(b)}'\n`;
        });
      } else {
        result += `Error: Hex length (${hex.length}) is not even`;
      }
    } else {
      result += `Unsupported format\n\n`;
      result += `Supported formats:\n`;
      result += `- Binary: 01001000 01100101 01101100 01101100 01101111\n`;
      result += `- Hex: 48 65 6C 6C 6F\n`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Binary conversion failed: " + error.message);
  }
}
