/**
  {
    "api": 1,
    "name": "Format GraphQL",
    "description": "Pretty-print GraphQL queries and schemas",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "graphql,format,pretty,gql"
  }
**/

function main(state) {
  try {
    let gql = state.text.trim();
    let indent = 0;
    let result = '';
    let inString = false;
    let stringChar = null;

    for (let i = 0; i < gql.length; i++) {
      const char = gql[i];
      const nextChar = gql[i + 1];

      // Handle strings
      if ((char === '"' || char === "'") && gql[i - 1] !== '\\') {
        if (!inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar) {
          inString = false;
          stringChar = null;
        }
        result += char;
        continue;
      }

      if (inString) {
        result += char;
        continue;
      }

      // Format structure
      if (char === '{') {
        indent++;
        result += ' {\n' + '  '.repeat(indent);
      } else if (char === '}') {
        indent--;
        result += '\n' + '  '.repeat(indent) + '}';
      } else if (char === '(') {
        result += '(';
      } else if (char === ')') {
        result += ')';
      } else if (char === ',') {
        result += ',\n' + '  '.repeat(indent);
      } else if (char === '\n' || char === '\r') {
        // Skip existing newlines
        continue;
      } else if (char === ' ' && result.endsWith('  ')) {
        // Skip duplicate spaces
        continue;
      } else {
        result += char;
      }
    }

    // Clean up extra whitespace
    result = result.replace(/\n\s*\n/g, '\n');
    result = result.replace(/{\s+}/g, '{}');

    state.text = result.trim();
  } catch (error) {
    state.postError("Failed to format GraphQL: " + error.message);
  }
}
