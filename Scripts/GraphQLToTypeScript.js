/**
  {
    "api": 1,
    "name": "GraphQL to TypeScript",
    "description": "Convert GraphQL schema to TypeScript types",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "graphql,typescript,convert,types"
  }
**/

function main(state) {
  try {
    const schema = state.text;
    let result = '';

    // Parse type definitions
    const typeRegex = /type\s+(\w+)\s*{([^}]+)}/g;
    let match;

    while ((match = typeRegex.exec(schema)) !== null) {
      const typeName = match[1];
      const fields = match[2].trim();

      result += `interface ${typeName} {\n`;

      const fieldLines = fields.split('\n');
      for (let line of fieldLines) {
        line = line.trim();
        if (!line) continue;

        // Parse field: name: Type! or name: [Type]
        const fieldMatch = line.match(/(\w+):\s*(\[?)(\w+)\]?(!?)/);
        if (fieldMatch) {
          const fieldName = fieldMatch[1];
          const isArray = fieldMatch[2] === '[';
          let fieldType = fieldMatch[3];
          const isRequired = fieldMatch[4] === '!';

          // Map GraphQL types to TypeScript
          const typeMap = {
            'String': 'string',
            'Int': 'number',
            'Float': 'number',
            'Boolean': 'boolean',
            'ID': 'string'
          };

          fieldType = typeMap[fieldType] || fieldType;

          if (isArray) {
            fieldType = `${fieldType}[]`;
          }

          const optional = isRequired ? '' : '?';
          result += `  ${fieldName}${optional}: ${fieldType};\n`;
        }
      }

      result += '}\n\n';
    }

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to convert GraphQL to TypeScript: " + error.message);
  }
}
