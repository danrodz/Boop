/**
  {
    "api": 1,
    "name": "Calculate Cyclomatic Complexity",
    "description": "Calculate approximate cyclomatic complexity of JavaScript code",
    "author": "Boop",
    "icon": "info",
    "tags": "complexity,code-quality,analysis,javascript"
  }
**/

function main(state) {
  const code = state.text;

  // Count decision points (simplified approach)
  const patterns = [
    /\bif\b/g,
    /\belse\s+if\b/g,
    /\bfor\b/g,
    /\bwhile\b/g,
    /\bcase\b/g,
    /\bcatch\b/g,
    /&&/g,
    /\|\|/g,
    /\?/g  // ternary operator
  ];

  let complexity = 1; // Base complexity

  patterns.forEach(pattern => {
    const matches = code.match(pattern);
    if (matches) {
      complexity += matches.length;
    }
  });

  let rating = 'Simple';
  let color = '🟢';

  if (complexity > 50) {
    rating = 'Very High';
    color = '🔴';
  } else if (complexity > 20) {
    rating = 'High';
    color = '🟠';
  } else if (complexity > 10) {
    rating = 'Moderate';
    color = '🟡';
  }

  let output = `Cyclomatic Complexity Analysis\n\n`;
  output += `${color} Complexity: ${complexity}\n`;
  output += `Rating: ${rating}\n\n`;

  output += `Interpretation:\n`;
  output += `1-10: Simple, easy to test\n`;
  output += `11-20: Moderate complexity\n`;
  output += `21-50: High complexity, consider refactoring\n`;
  output += `50+: Very high, definitely refactor\n\n`;

  output += `Note: This is a simplified calculation.\nUse proper tools for accurate analysis.`;

  state.text = output;
}
