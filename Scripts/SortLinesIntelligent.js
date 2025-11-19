/**
  {
    "api": 1,
    "name": "Sort Lines Intelligently",
    "description": "Smart sort: numeric, alphabetic, or natural order",
    "author": "Boop",
    "icon": "arrow.up.arrow.down.circle.fill",
    "tags": "sort,lines,natural,intelligent"
  }
**/

function main(state) {
  const lines = state.text.split('\n');

  // Detect if lines are primarily numeric
  const numericLines = lines.filter(line => {
    const trimmed = line.trim();
    return trimmed !== '' && !isNaN(trimmed);
  });

  const isNumeric = numericLines.length > lines.length * 0.7;

  if (isNumeric) {
    // Numeric sort
    lines.sort((a, b) => {
      const numA = parseFloat(a.trim());
      const numB = parseFloat(b.trim());

      if (isNaN(numA) && isNaN(numB)) return 0;
      if (isNaN(numA)) return 1;
      if (isNaN(numB)) return -1;

      return numA - numB;
    });
  } else {
    // Natural sort (handles numbers within strings)
    lines.sort((a, b) => {
      return a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base'
      });
    });
  }

  state.text = lines.join('\n');
}
