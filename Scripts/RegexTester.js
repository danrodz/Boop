/**
  {
    "api": 1,
    "name": "RegEx Tester & Matcher",
    "description": "Tests regex pattern and shows all matches with groups",
    "author": "Boop",
    "icon": "magnifyingglass.circle.fill",
    "tags": "regex,test,match,pattern,find"
  }
**/

function main(state) {
  try {
    const lines = state.text.split('\n');

    if (lines.length < 2) {
      state.postError("Format: Line 1 = regex pattern, Line 2+ = test text");
      return;
    }

    const pattern = lines[0];
    const testText = lines.slice(1).join('\n');

    // Parse pattern and flags
    const match = pattern.match(/^\/(.+)\/([gimsuvy]*)$/);
    let regex;

    if (match) {
      regex = new RegExp(match[1], match[2]);
    } else {
      // Assume no delimiters, default to global
      regex = new RegExp(pattern, 'g');
    }

    const matches = [...testText.matchAll(regex)];

    if (matches.length === 0) {
      state.text = `Pattern: ${pattern}\nFlags: ${regex.flags}\n\nNo matches found.`;
      return;
    }

    let result = `Pattern: ${pattern}\nFlags: ${regex.flags}\n\nMatches: ${matches.length}\n\n`;

    matches.forEach((match, i) => {
      result += `Match ${i + 1}: "${match[0]}"\n`;
      result += `  Index: ${match.index}\n`;

      if (match.length > 1) {
        result += `  Groups:\n`;
        for (let j = 1; j < match.length; j++) {
          result += `    ${j}: "${match[j]}"\n`;
        }
      }
      result += '\n';
    });

    state.text = result.trim();

  } catch (error) {
    state.postError("Regex error: " + error.message);
  }
}
