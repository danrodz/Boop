/**
  {
    "api": 1,
    "name": "JSON to Properties",
    "description": "Converts JSON to Java Properties format",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,properties,convert,transform,java"
  }
**/

function jsonToProperties(obj, prefix = '') {
  let props = '';

  for (let key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];

    if (value === null || value === undefined) {
      props += `${fullKey}=\n`;
    } else if (typeof value === 'object' && !Array.isArray(value)) {
      props += jsonToProperties(value, fullKey);
    } else {
      props += `${fullKey}=${value}\n`;
    }
  }

  return props;
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = jsonToProperties(json);
  } catch (error) {
    state.postError("Failed to convert JSON to Properties: " + error.message);
  }
}
