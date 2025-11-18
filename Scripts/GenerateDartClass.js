/**
  {
    "api": 1,
    "name": "JSON to Dart Class",
    "description": "Generate Dart class from JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,dart,flutter,class,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getDartType(value) {
      if (value === null) return 'String?';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'List<dynamic>';
        return 'List<' + getDartType(value[0]) + '>';
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'int' : 'double';
      }
      if (typeof value === 'boolean') return 'bool';
      return 'String';
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateClass(obj, name = 'Root', indent = 0) {
      const spaces = '  '.repeat(indent);
      let result = `${spaces}class ${name} {\n`;

      // Fields
      for (let [key, value] of Object.entries(obj)) {
        const type = getDartType(value);

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateClass(value, nestedName, indent + 1);
          result += `${spaces}  final ${nestedName} ${key};\n`;
        } else {
          result += `${spaces}  final ${type} ${key};\n`;
        }
      }

      // Constructor
      result += `\n${spaces}  ${name}({\n`;
      for (let key of Object.keys(obj)) {
        result += `${spaces}    required this.${key},\n`;
      }
      result += `${spaces}  });\n`;

      // fromJson
      result += `\n${spaces}  factory ${name}.fromJson(Map<String, dynamic> json) {\n`;
      result += `${spaces}    return ${name}(\n`;
      for (let key of Object.keys(obj)) {
        result += `${spaces}      ${key}: json['${key}'],\n`;
      }
      result += `${spaces}    );\n`;
      result += `${spaces}  }\n`;

      result += `${spaces}}\n\n`;
      return result;
    }

    state.text = generateClass(json).trim();
  } catch (error) {
    state.postError("Failed to generate Dart class: " + error.message);
  }
}
