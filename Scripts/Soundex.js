/**
  {
    "api": 1,
    "name": "Soundex",
    "description": "Convert name to Soundex phonetic code",
    "author": "Boop",
    "icon": "waveform",
    "tags": "soundex,phonetic,encode,sound"
  }
**/

function main(state) {
  try {
    const text = state.text.toUpperCase().trim();

    function soundex(s) {
      const codes = {
        'B': 1, 'F': 1, 'P': 1, 'V': 1,
        'C': 2, 'G': 2, 'J': 2, 'K': 2, 'Q': 2, 'S': 2, 'X': 2, 'Z': 2,
        'D': 3, 'T': 3,
        'L': 4,
        'M': 5, 'N': 5,
        'R': 6
      };

      let code = s[0];
      let prev = codes[s[0]];

      for (let i = 1; i < s.length && code.length < 4; i++) {
        const curr = codes[s[i]];
        if (curr && curr !== prev) {
          code += curr;
        }
        prev = curr;
      }

      return code.padEnd(4, '0');
    }

    // Process each word
    const words = text.split(/\s+/);
    const result = words.map(word => {
      const clean = word.replace(/[^A-Z]/g, '');
      return clean ? `${word}: ${soundex(clean)}` : word;
    }).join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate Soundex: " + error.message);
  }
}
