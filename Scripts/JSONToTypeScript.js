/**
  {
    "api": 1,
    "name": "JSON to TypeScript Interface",
    "description": "Generates TypeScript interface from JSON",
    "author": "Boop",
    "icon": "doc.text.fill",
    "tags": "json,typescript,interface,generate,type"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getType(value, indent = 2) {
      if (value === null) return 'null';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'any[]';
        const itemType = getType(value[0], indent);
        return `${itemType}[]`;
      }
      if (typeof value === 'object') {
        return generateInterface(value, indent);
      }
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'number' : 'number';
      }
      return typeof value;
    }

    function generateInterface(obj, indent = 2) {
      const spaces = ' '.repeat(indent);
      const innerSpaces = ' '.repeat(indent + 2);
      const props = Object.entries(obj).map(([key, value]) => {
        const type = getType(value, indent + 2);
        const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
        return `${innerSpaces}${safeKey}: ${type};`;
      });
      return `{\n${props.join('\n')}\n${spaces}}`;
    }

    let result;
    if (Array.isArray(json)) {
      if (json.length === 0) {
        result = 'interface Root {\n  // Empty array\n}';
      } else {
        result = `interface RootItem ${generateInterface(json[0])}\n\ntype Root = RootItem[];`;
      }
    } else {
      result = `interface Root ${generateInterface(json)}`;
    }

    state.text = result;

  } catch (error) {
    state.postError("Failed to generate interface: " + error.message);
  }
}
