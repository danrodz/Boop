/**
  {
    "api": 1,
    "name": "Detect Homoglyphs",
    "description": "Detect lookalike characters (homoglyphs) that may be used for spoofing",
    "author": "Boop",
    "icon": "exclamationmark.triangle",
    "tags": "homoglyph,security,detect,unicode"
  }
**/

function main(state) {
  try {
    const text = state.text;
    const warnings = [];

    // Common homoglyphs
    const homoglyphs = {
      'а': 'a (Cyrillic)',
      'е': 'e (Cyrillic)',
      'о': 'o (Cyrillic)',
      'р': 'p (Cyrillic)',
      'с': 'c (Cyrillic)',
      'у': 'y (Cyrillic)',
      'х': 'x (Cyrillic)',
      'ı': 'i (dotless)',
      'ǀ': '| (dental click)',
      '０': '0 (fullwidth)',
      '１': '1 (fullwidth)',
      'Ｏ': 'O (fullwidth)',
      'Ι': 'I (Greek)',
      'Ο': 'O (Greek)',
      'Α': 'A (Greek)',
    };

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (homoglyphs[char]) {
        warnings.push(`Position ${i}: '${char}' looks like Latin but is ${homoglyphs[char]}`);
      }
    }

    if (warnings.length === 0) {
      state.text = '✓ No homoglyphs detected';
    } else {
      state.text = 'Homoglyphs found:\n' + warnings.join('\n');
    }
  } catch (error) {
    state.postError("Failed to detect homoglyphs: " + error.message);
  }
}
