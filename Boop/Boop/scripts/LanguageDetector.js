/**
  {
    "api": 1,
    "name": "Language Detector",
    "description": "Detect language of text (basic heuristic)",
    "author": "Boop",
    "icon": "globe",
    "tags": "language,detect,i18n,nlp"
  }
**/

function main(state) {
  try {
    const text = state.text.toLowerCase();

    // Simple heuristic based on common words
    const patterns = {
      english: /\b(the|and|is|in|to|of|a|for|on|with)\b/g,
      spanish: /\b(el|la|de|que|y|en|los|se|del|las)\b/g,
      french: /\b(le|de|un|et|être|à|il|que|ne|dans)\b/g,
      german: /\b(der|die|und|in|den|von|zu|das|mit|sich)\b/g,
      portuguese: /\b(o|a|de|que|e|do|da|em|um|para)\b/g,
      italian: /\b(il|di|e|la|per|che|un|in|è|a)\b/g
    };

    const scores = {};

    for (const [lang, pattern] of Object.entries(patterns)) {
      const matches = text.match(pattern);
      scores[lang] = matches ? matches.length : 0;
    }

    // Sort by score
    const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);

    const result = [
      'Language Detection (heuristic):',
      '',
      ...sorted.map(([lang, score]) => `${lang}: ${score} matches`)
    ];

    if (sorted[0][1] > 0) {
      result.push('');
      result.push(`Most likely: ${sorted[0][0]}`);
    } else {
      result.push('');
      result.push('Could not determine language');
    }

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error detecting language: " + error.message);
  }
}
