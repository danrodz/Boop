/**
  {
    "api": 1,
    "name": "Metaphone",
    "description": "Convert text to Metaphone phonetic code",
    "author": "Boop",
    "icon": "waveform",
    "tags": "metaphone,phonetic,encode,sound"
  }
**/

function main(state) {
  try {
    const text = state.text.toUpperCase().trim();

    function metaphone(word) {
      // Simplified Metaphone implementation
      let code = '';
      let w = word.replace(/[^A-Z]/g, '');

      // Drop duplicate adjacent letters
      w = w.replace(/([A-Z])\1+/g, '$1');

      // Transformations
      if (w.startsWith('KN')) w = w.substring(1);
      if (w.startsWith('GN')) w = w.substring(1);
      if (w.startsWith('PN')) w = w.substring(1);
      if (w.startsWith('AE')) w = w.substring(1);
      if (w.startsWith('WR')) w = w.substring(1);

      for (let i = 0; i < w.length; i++) {
        const c = w[i];
        const prev = w[i - 1];
        const next = w[i + 1];

        if (i === 0 && 'AEIOU'.includes(c)) {
          code += c;
        } else if ('AEIOU'.includes(c)) {
          // Skip vowels except at start
        } else if (c === 'B') {
          if (i !== w.length - 1 || prev !== 'M') code += 'B';
        } else if (c === 'C') {
          if (next === 'H') code += 'X';
          else if ('IEY'.includes(next)) code += 'S';
          else code += 'K';
        } else if (c === 'D') {
          if (next === 'G' && 'IEY'.includes(w[i + 2])) code += 'J';
          else code += 'T';
        } else if (c === 'G') {
          if (next === 'H' && i < w.length - 2) continue;
          else if (next === 'N' && i === w.length - 2) continue;
          else if ('IEY'.includes(next)) code += 'J';
          else code += 'K';
        } else if (c === 'H') {
          if (!'AEIOU'.includes(next) || 'AEIOU'.includes(prev)) continue;
          code += 'H';
        } else if ('KQX'.includes(c)) {
          code += 'K';
        } else if (c === 'P' && next === 'H') {
          code += 'F';
        } else if (c === 'S' && next === 'H') {
          code += 'X';
        } else if (c === 'T' && next === 'H') {
          code += '0';
        } else if (c === 'W' && 'AEIOU'.includes(next)) {
          code += 'W';
        } else if (c === 'Y' && 'AEIOU'.includes(next)) {
          code += 'Y';
        } else if ('FJLMNR'.includes(c)) {
          code += c;
        } else if (c === 'Z') {
          code += 'S';
        }
      }

      return code;
    }

    const words = text.split(/\s+/);
    const result = words.map(word => {
      const code = metaphone(word);
      return `${word}: ${code}`;
    }).join('\n');

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate Metaphone: " + error.message);
  }
}
