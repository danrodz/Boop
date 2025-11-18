/**
  {
    "api": 1,
    "name": "API Response to Type",
    "description": "Convert JSON API response to TypeScript interface",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,typescript,interface,type,api"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function jsonToInterface(obj, name) {
      const lines = [];
      lines.push(`interface ${name} {`);

      for (const [key, value] of Object.entries(obj)) {
        let type = 'any';

        if (value === null) {
          type = 'null';
        } else if (Array.isArray(value)) {
          if (value.length > 0 && typeof value[0] === 'object') {
            type = `${capitalizeFirst(key)}Item[]`;
          } else {
            type = `${typeof value[0] || 'any'}[]`;
          }
        } else if (typeof value === 'object') {
          type = capitalizeFirst(key);
        } else {
          type = typeof value;
        }

        lines.push(`  ${key}: ${type};`);
      }

      lines.push('}');
      return lines.join('\n');
    }

    function capitalizeFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const result = jsonToInterface(json, 'ApiResponse');
    state.text = result;
  } catch (error) {
    state.postError("Error converting to TypeScript: " + error.message);
  }
}
