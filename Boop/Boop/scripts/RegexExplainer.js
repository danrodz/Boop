/**
  {
    "api": 1,
    "name": "Regex Explainer",
    "description": "Explain regex patterns in plain English",
    "author": "Boop",
    "icon": "text.magnifyingglass",
    "tags": "regex,regexp,explain,pattern"
  }
**/

function main(state) {
  try {
    const regex = state.text.trim();
    const explanations = [];

    // Remove leading/trailing slashes and flags
    let pattern = regex.replace(/^\/|\/[gimsuvy]*$/g, '');

    const components = {
      '^': 'Start of string',
      '$': 'End of string',
      '.': 'Any character',
      '\\d': 'Any digit (0-9)',
      '\\D': 'Any non-digit',
      '\\w': 'Any word character (a-z, A-Z, 0-9, _)',
      '\\W': 'Any non-word character',
      '\\s': 'Any whitespace',
      '\\S': 'Any non-whitespace',
      '\\b': 'Word boundary',
      '\\B': 'Non-word boundary',
      '*': 'Zero or more times',
      '+': 'One or more times',
      '?': 'Zero or one time',
      '|': 'OR operator'
    };

    explanations.push("Pattern: " + regex);
    explanations.push("\nBreakdown:");

    let i = 0;
    while (i < pattern.length) {
      let found = false;

      // Check for character classes
      if (pattern[i] === '[') {
        const end = pattern.indexOf(']', i);
        if (end !== -1) {
          const charClass = pattern.substring(i, end + 1);
          explanations.push(`  ${charClass} - Match any character in this set`);
          i = end + 1;
          found = true;
        }
      }

      // Check for groups
      if (!found && pattern[i] === '(') {
        let depth = 1;
        let end = i + 1;
        while (end < pattern.length && depth > 0) {
          if (pattern[end] === '(') depth++;
          if (pattern[end] === ')') depth--;
          end++;
        }
        const group = pattern.substring(i, end);
        explanations.push(`  ${group} - Capture group`);
        i = end;
        found = true;
      }

      // Check for quantifiers
      if (!found && pattern[i] === '{') {
        const end = pattern.indexOf('}', i);
        if (end !== -1) {
          const quant = pattern.substring(i, end + 1);
          explanations.push(`  ${quant} - Repeat the previous pattern`);
          i = end + 1;
          found = true;
        }
      }

      // Check for two-character sequences
      if (!found && i < pattern.length - 1) {
        const twoChar = pattern.substring(i, i + 2);
        if (components[twoChar]) {
          explanations.push(`  ${twoChar} - ${components[twoChar]}`);
          i += 2;
          found = true;
        }
      }

      // Check for single characters
      if (!found) {
        const char = pattern[i];
        if (components[char]) {
          explanations.push(`  ${char} - ${components[char]}`);
        } else if (char.match(/[a-zA-Z0-9]/)) {
          explanations.push(`  ${char} - Literal character '${char}'`);
        }
        i++;
      }
    }

    state.text = explanations.join('\n');
  } catch (error) {
    state.postError("Error explaining regex: " + error.message);
  }
}
