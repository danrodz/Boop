/**
  {
    "api": 1,
    "name": "Regex to English",
    "description": "Explain regex pattern in plain English",
    "author": "Boop",
    "icon": "text.bubble",
    "tags": "regex,explain,english,documentation"
  }
**/

function main(state) {
  try {
    const regex = state.text.trim();
    let explanation = [];

    // Simple regex explanations
    const patterns = {
      '^': 'Start of string',
      '$': 'End of string',
      '.': 'Any character',
      '*': 'Zero or more times',
      '+': 'One or more times',
      '?': 'Zero or one time',
      '\\d': 'Any digit',
      '\\D': 'Any non-digit',
      '\\w': 'Any word character',
      '\\W': 'Any non-word character',
      '\\s': 'Any whitespace',
      '\\S': 'Any non-whitespace',
      '\\b': 'Word boundary',
      '\\B': 'Non-word boundary',
      '[a-z]': 'Any lowercase letter',
      '[A-Z]': 'Any uppercase letter',
      '[0-9]': 'Any digit',
      '|': 'OR',
    };

    for (let [pattern, desc] of Object.entries(patterns)) {
      if (regex.includes(pattern)) {
        explanation.push(`${pattern} = ${desc}`);
      }
    }

    // Quantifiers
    const quantMatch = regex.match(/\{(\d+),?(\d+)?\}/);
    if (quantMatch) {
      if (quantMatch[2]) {
        explanation.push(`{${quantMatch[1]},${quantMatch[2]}} = Between ${quantMatch[1]} and ${quantMatch[2]} times`);
      } else {
        explanation.push(`{${quantMatch[1]}} = Exactly ${quantMatch[1]} times`);
      }
    }

    // Character classes
    const charClassMatch = regex.match(/\[([^\]]+)\]/);
    if (charClassMatch) {
      explanation.push(`[${charClassMatch[1]}] = Any character in set: ${charClassMatch[1]}`);
    }

    // Groups
    const groupCount = (regex.match(/\(/g) || []).length;
    if (groupCount > 0) {
      explanation.push(`Contains ${groupCount} capture group(s)`);
    }

    if (explanation.length === 0) {
      explanation.push('Simple literal match: ' + regex);
    }

    state.text = 'Regex: ' + regex + '\n\nExplanation:\n' + explanation.join('\n');
  } catch (error) {
    state.postError("Failed to explain regex: " + error.message);
  }
}
