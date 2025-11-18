/**
  {
    "api": 1,
    "name": "JSON to Java Class",
    "description": "Generate Java POJO from JSON",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,java,pojo,class,generate"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function getJavaType(value) {
      if (value === null) return 'Object';
      if (Array.isArray(value)) {
        if (value.length === 0) return 'List<Object>';
        return 'List<' + getJavaType(value[0]) + '>';
      }
      if (typeof value === 'object') return 'object';
      if (typeof value === 'number') {
        return Number.isInteger(value) ? 'Integer' : 'Double';
      }
      if (typeof value === 'boolean') return 'Boolean';
      return 'String';
    }

    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function generateClass(obj, name = 'Root', indent = 0) {
      const spaces = '  '.repeat(indent);
      let result = `${spaces}public class ${name} {\n`;

      // Fields
      for (let [key, value] of Object.entries(obj)) {
        const type = getJavaType(value);

        if (type === 'object' && !Array.isArray(value)) {
          const nestedName = capitalize(key);
          result += generateClass(value, nestedName, indent + 1);
          result += `${spaces}  private ${nestedName} ${key};\n`;
        } else {
          result += `${spaces}  private ${type} ${key};\n`;
        }
      }

      // Getters and setters
      for (let [key, value] of Object.entries(obj)) {
        const type = getJavaType(value);
        const capitalizedKey = capitalize(key);
        const actualType = type === 'object' ? capitalize(key) : type;

        result += `\n${spaces}  public ${actualType} get${capitalizedKey}() {\n`;
        result += `${spaces}    return ${key};\n`;
        result += `${spaces}  }\n`;

        result += `\n${spaces}  public void set${capitalizedKey}(${actualType} ${key}) {\n`;
        result += `${spaces}    this.${key} = ${key};\n`;
        result += `${spaces}  }\n`;
      }

      result += `${spaces}}\n\n`;
      return result;
    }

    state.text = generateClass(json).trim();
  } catch (error) {
    state.postError("Failed to generate Java class: " + error.message);
  }
}
