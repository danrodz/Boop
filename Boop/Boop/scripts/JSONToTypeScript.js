/**
  {
    "api":1,
    "name":"JSON to TypeScript",
    "description":"Generate TypeScript interface from JSON",
    "author":"danrodz",
    "icon":"code",
    "tags":"json,typescript,interface,type"
  }
**/

function main(state) {
  try {
    const obj = JSON.parse(state.text);
    const interfaceName = "RootInterface";
    const interfaces = [];

    generateInterface(obj, interfaceName, interfaces);

    state.text = interfaces.join('\n\n');
  } catch (error) {
    state.postError("Invalid JSON");
  }
}

function generateInterface(obj, name, interfaces, indent = 0) {
  const indentStr = '  '.repeat(indent);
  let interfaceDef = `${indentStr}interface ${name} {\n`;

  if (Array.isArray(obj)) {
    // For arrays, use the first item as a template
    if (obj.length > 0) {
      const itemType = getType(obj[0], name + 'Item', interfaces, indent + 1);
      interfaceDef = `${indentStr}type ${name} = ${itemType}[];\n`;
      interfaces.push(interfaceDef.trim());
    } else {
      interfaceDef = `${indentStr}type ${name} = any[];\n`;
      interfaces.push(interfaceDef.trim());
    }
    return;
  }

  const keys = Object.keys(obj);

  if (keys.length === 0) {
    interfaceDef += `${indentStr}}\n`;
    interfaces.push(interfaceDef.trim());
    return;
  }

  keys.forEach(key => {
    const value = obj[key];
    const type = getType(value, capitalize(key), interfaces, indent + 1);
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
    interfaceDef += `${indentStr}  ${safeKey}: ${type};\n`;
  });

  interfaceDef += `${indentStr}}`;
  interfaces.push(interfaceDef.trim());
}

function getType(value, suggestedName, interfaces, indent) {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  const valueType = typeof value;

  if (valueType === 'string') {
    return 'string';
  }

  if (valueType === 'number') {
    return 'number';
  }

  if (valueType === 'boolean') {
    return 'boolean';
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return 'any[]';
    }

    const firstItem = value[0];
    const itemType = getType(firstItem, suggestedName + 'Item', interfaces, indent);

    // Check if all items have the same type
    const allSameType = value.every(item => {
      const t = typeof item;
      const firstT = typeof firstItem;
      if (t !== firstT) return false;
      if (t === 'object' && item !== null && firstItem !== null) {
        return Array.isArray(item) === Array.isArray(firstItem);
      }
      return true;
    });

    if (allSameType && typeof firstItem === 'object' && firstItem !== null && !Array.isArray(firstItem)) {
      const interfaceName = suggestedName;
      generateInterface(firstItem, interfaceName, interfaces, 0);
      return `${interfaceName}[]`;
    }

    return `${itemType}[]`;
  }

  if (valueType === 'object') {
    const interfaceName = suggestedName;
    generateInterface(value, interfaceName, interfaces, 0);
    return interfaceName;
  }

  return 'any';
}

function capitalize(str) {
  if (!str) return str;
  // Remove special characters and capitalize
  const cleaned = str.replace(/[^a-zA-Z0-9]/g, '');
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}
