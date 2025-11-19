/**
  {
    "api": 1,
    "name": "Binary Comparator",
    "description": "Compare two hex/binary strings",
    "author": "Boop",
    "icon": "arrow.left.and.right",
    "tags": "binary,compare,diff,hex"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');

    if (lines.length < 2) {
      state.postError("Provide two lines: first line = string 1, second line = string 2");
      return;
    }

    const str1 = lines[0].trim();
    const str2 = lines[1].trim();

    // Compare as hex if looks like hex
    const isHex = /^[0-9A-Fa-f\s]+$/.test(str1) && /^[0-9A-Fa-f\s]+$/.test(str2);

    let bytes1, bytes2;

    if (isHex) {
      const hex1 = str1.replace(/\s/g, '');
      const hex2 = str2.replace(/\s/g, '');

      bytes1 = [];
      bytes2 = [];

      for (let i = 0; i < hex1.length; i += 2) {
        bytes1.push(parseInt(hex1.substr(i, 2), 16));
      }

      for (let i = 0; i < hex2.length; i += 2) {
        bytes2.push(parseInt(hex2.substr(i, 2), 16));
      }
    } else {
      bytes1 = Array.from(str1).map(c => c.charCodeAt(0));
      bytes2 = Array.from(str2).map(c => c.charCodeAt(0));
    }

    const maxLen = Math.max(bytes1.length, bytes2.length);
    let differences = 0;
    const diffPositions = [];

    for (let i = 0; i < maxLen; i++) {
      if (bytes1[i] !== bytes2[i]) {
        differences++;
        if (diffPositions.length < 20) {
          diffPositions.push({
            pos: i,
            byte1: bytes1[i],
            byte2: bytes2[i]
          });
        }
      }
    }

    let result = `=== BINARY COMPARISON ===\n\n`;
    result += `String 1 length: ${bytes1.length} bytes\n`;
    result += `String 2 length: ${bytes2.length} bytes\n`;
    result += `Differences: ${differences}\n`;
    result += `Similarity: ${(((maxLen - differences) / maxLen) * 100).toFixed(1)}%\n\n`;

    if (differences === 0) {
      result += `✓ Strings are identical\n`;
    } else {
      result += `=== FIRST ${Math.min(diffPositions.length, 20)} DIFFERENCES ===\n\n`;

      diffPositions.forEach(diff => {
        result += `Position ${diff.pos}:\n`;

        if (diff.byte1 !== undefined) {
          result += `  String 1: 0x${diff.byte1.toString(16).toUpperCase().padStart(2, '0')} (${diff.byte1})`;

          if (diff.byte1 >= 32 && diff.byte1 < 127) {
            result += ` '${String.fromCharCode(diff.byte1)}'`;
          }

          result += '\n';
        } else {
          result += `  String 1: <EOF>\n`;
        }

        if (diff.byte2 !== undefined) {
          result += `  String 2: 0x${diff.byte2.toString(16).toUpperCase().padStart(2, '0')} (${diff.byte2})`;

          if (diff.byte2 >= 32 && diff.byte2 < 127) {
            result += ` '${String.fromCharCode(diff.byte2)}'`;
          }

          result += '\n';
        } else {
          result += `  String 2: <EOF>\n`;
        }

        result += '\n';
      });

      if (differences > diffPositions.length) {
        result += `... and ${differences - diffPositions.length} more differences\n`;
      }
    }

    result += `\n=== SUMMARY ===\n`;
    result += `Same bytes: ${maxLen - differences}\n`;
    result += `Different bytes: ${differences}\n`;

    if (bytes1.length !== bytes2.length) {
      result += `Length difference: ${Math.abs(bytes1.length - bytes2.length)} bytes\n`;
    }

    state.text = result;
  } catch (error) {
    state.postError("Comparison failed: " + error.message);
  }
}
