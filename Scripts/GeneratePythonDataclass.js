/**
  {
    "api": 1,
    "name": "JSON to Python Dataclass",
    "description": "Generate Python dataclass from JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,python,dataclass,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getPythonType(value) {
      if (value === null) return 'Optional[str]';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'List[Any]';
        return 'List[' + getPythonType(value[0]) + ']';
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'int' : 'float';
      }
      if (typeof value === 'boolean') return 'bool';
      return 'str';
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateDataclass(obj, name = 'Root', indent = 0) {
      const spaces = '  '.repeat(indent);
      let result = `${spaces}@dataclass\n`;
      result += `${spaces}class ${name}:\n`;

      for (let [key, value] of Object.entries(obj)) {
        const type = getPythonType(value);

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateDataclass(value, nestedName, indent + 1);
          result += `${spaces}  ${key}: ${nestedName}\n`;
        } else {
          result += `${spaces}  ${key}: ${type}\n`;
        }
      }

      result += '\n';
      return result;
    }

    let output = 'from dataclasses import dataclass\n';
    output += 'from typing import List, Optional, Any\n\n';
    output += generateDataclass(json);

    state.text = output.trim();
  } catch (error) {
    state.postError("Failed to generate Python dataclass: " + error.message);
  }
}
