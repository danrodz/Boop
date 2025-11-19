/**
  {
    "api": 1,
    "name": "Invisible Character Detector",
    "description": "Detect invisible and zero-width characters",
    "author": "Boop",
    "icon": "eye.trianglebadge.exclamationmark",
    "tags": "invisible,character,detect,zerowidth,hidden"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const found = [];

    const invisibleChars = {
      0x200B: 'Zero Width Space (ZWSP)',
      0x200C: 'Zero Width Non-Joiner (ZWNJ)',
      0x200D: 'Zero Width Joiner (ZWJ)',
      0xFEFF: 'Zero Width No-Break Space (BOM)',
      0x2060: 'Word Joiner',
      0x180E: 'Mongolian Vowel Separator',
      0x00A0: 'Non-Breaking Space',
      0x2000: 'En Quad',
      0x2001: 'Em Quad',
      0x2002: 'En Space',
      0x2003: 'Em Space',
      0x2004: 'Three-Per-Em Space',
      0x2005: 'Four-Per-Em Space',
      0x2006: 'Six-Per-Em Space',
      0x2007: 'Figure Space',
      0x2008: 'Punctuation Space',
      0x2009: 'Thin Space',
      0x200A: 'Hair Space',
      0x202F: 'Narrow No-Break Space',
      0x205F: 'Medium Mathematical Space',
      0x3000: 'Ideographic Space'
    };

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);

      if (invisibleChars[code]) {
        found.push({
          pos: i,
          char: text[i],
          code: code,
          name: invisibleChars[code]
        });
      } else if (code < 32 && code !== 10 && code !== 13 && code !== 9) {
        found.push({
          pos: i,
          char: text[i],
          code: code,
          name: `Control Character (${code})`
        });
      }
    }

    if (found.length === 0) {
      state.text = '✓ No invisible characters detected';
      return;
    }

    let result = `Found ${found.length} invisible character(s):\n\n`;

    for (let item of found) {
      result += `Position ${item.pos}: ${item.name}\n`;
      result += `  Code: U+${item.code.toString(16).toUpperCase().padStart(4, '0')}\n`;
      result += `  Decimal: ${item.code}\n\n`;
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Detection failed: " + error.message);
  }
}
