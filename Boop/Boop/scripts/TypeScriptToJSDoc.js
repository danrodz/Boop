/**
  {
    "api": 1,
    "name": "TypeScript to JSDoc",
    "description": "Convert TypeScript interface to JSDoc typedef",
    "author": "Boop",
    "icon": "doc.text.below.ecg",
    "tags": "typescript,jsdoc,convert,documentation"
  }
**/

function main(state) {
  try {
    const input = state.text;

    // Parse interface
    const interfaceMatch = input.match(/interface\s+(\w+)\s*{([^}]+)}/);
    if (!interfaceMatch) {
      state.postError("Could not find TypeScript interface");
      return;
    }

    const interfaceName = interfaceMatch[1];
    const fields = interfaceMatch[2].trim().split('\n');

    const result = [`/**`, ` * @typedef {Object} ${interfaceName}`];

    for (const field of fields) {
      const fieldMatch = field.trim().match(/(\w+)(\?)?:\s*([^;]+);?/);
      if (!fieldMatch) continue;

      const fieldName = fieldMatch[1];
      const optional = fieldMatch[2] === '?';
      const fieldType = fieldMatch[3].trim();

      // Convert TS types to JSDoc types
      let jsDocType = fieldType
        .replace('string', 'string')
        .replace('number', 'number')
        .replace('boolean', 'boolean')
        .replace('any', '*')
        .replace(/\[\]$/, '[]');

      const optionalPrefix = optional ? '[' : '';
      const optionalSuffix = optional ? ']' : '';

      result.push(` * @property {${jsDocType}} ${optionalPrefix}${fieldName}${optionalSuffix}`);
    }

    result.push(' */');

    state.text = result.join('\n');
  } catch (error) {
    state.postError("Error converting to JSDoc: " + error.message);
  }
}
