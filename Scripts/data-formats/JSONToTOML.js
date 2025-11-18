/**
  {
    "api": 1,
    "name": "JSON to TOML",
    "description": "Converts JSON to TOML format",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,toml,convert,transform,config"
  }
**/

function jsonToToml(obj, prefix = '') {
  let toml = '';
  let tables = '';

  for (let key in obj) {
    const value = obj[key];
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (value === null) {
      toml += `${key} = null\n`;
    } else if (typeof value === 'boolean') {
      toml += `${key} = ${value}\n`;
    } else if (typeof value === 'number') {
      toml += `${key} = ${value}\n`;
    } else if (typeof value === 'string') {
      toml += `${key} = "${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"\n`;
    } else if (Array.isArray(value)) {
      if (value.length > 0 && typeof value[0] !== 'object') {
        toml += `${key} = [${value.map(v => typeof v === 'string' ? `"${v}"` : v).join(', ')}]\n`;
      } else {
        for (let item of value) {
          tables += `\n[[${fullKey}]]\n${jsonToToml(item)}`;
        }
      }
    } else if (typeof value === 'object') {
      tables += `\n[${fullKey}]\n${jsonToToml(value)}`;
    }
  }

  return toml + tables;
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = jsonToToml(json).trim();
  } catch (error) {
    state.postError("Failed to convert JSON to TOML: " + error.message);
  }
}
