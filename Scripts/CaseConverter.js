/**
  {
    "api": 1,
    "name": "String Case Converter",
    "description": "Converts between camelCase, snake_case, kebab-case, etc.",
    "author": "Boop",
    "icon": "textformat",
    "tags": "case,convert,camel,snake,kebab,pascal"
  }
**/

function main(state) {
  const input = state.text.trim();

  // Split into words
  let words = [];

  // Detect current format and split
  if (input.includes('_')) {
    // snake_case or SCREAMING_SNAKE_CASE
    words = input.toLowerCase().split('_');
  } else if (input.includes('-')) {
    // kebab-case
    words = input.toLowerCase().split('-');
  } else if (input.includes(' ')) {
    // space separated
    words = input.toLowerCase().split(/\s+/);
  } else {
    // camelCase or PascalCase - split on capital letters
    words = input
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .toLowerCase()
      .split(/\s+/);
  }

  // Generate all formats
  const camelCase = words.map((w, i) =>
    i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1)
  ).join('');

  const pascalCase = words.map(w =>
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join('');

  const snakeCase = words.join('_');

  const screamingSnakeCase = words.join('_').toUpperCase();

  const kebabCase = words.join('-');

  const trainCase = words.map(w =>
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join('-');

  const titleCase = words.map(w =>
    w.charAt(0).toUpperCase() + w.slice(1)
  ).join(' ');

  const dotCase = words.join('.');

  const result = `CASE CONVERTER

camelCase:       ${camelCase}
PascalCase:      ${pascalCase}
snake_case:      ${snakeCase}
SCREAMING_SNAKE: ${screamingSnakeCase}
kebab-case:      ${kebabCase}
Train-Case:      ${trainCase}
Title Case:      ${titleCase}
dot.case:        ${dotCase}`;

  state.text = result;
}
