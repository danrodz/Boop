/**
  {
    "api": 1,
    "name": "JSON to C# Class",
    "description": "Generate C# class from JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,csharp,class,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getCSharpType(value) {
      if (value === null) return 'string';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'List<object>';
        return 'List<' + getCSharpType(value[0]) + '>';
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'int' : 'double';
      }
      if (typeof value === 'boolean') return 'bool';
      return 'string';
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateClass(obj, name = 'Root', indent = 0) {
      const spaces = '    '.repeat(indent);
      let result = `${spaces}public class ${name}\n${spaces}{\n`;

      for (let [key, value] of Object.entries(obj)) {
        const propName = capitalize(key);
        const type = getCSharpType(value);

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateClass(value, nestedName, indent + 1);
          result += `${spaces}    public ${nestedName} ${propName} { get; set; }\n`;
        } else {
          result += `${spaces}    public ${type} ${propName} { get; set; }\n`;
        }
      }

      result += `${spaces}}\n\n`;
      return result;
    }

    state.text = generateClass(json).trim();
  } catch (error) {
    state.postError("Failed to generate C# class: " + error.message);
  }
}
