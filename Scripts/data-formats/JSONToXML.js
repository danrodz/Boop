/**
  {
    "api": 1,
    "name": "JSON to XML",
    "description": "Converts JSON to XML format",
    "author": "Boop",
    "icon": "arrow.right",
    "tags": "json,xml,convert,transform"
  }
**/

function jsonToXml(obj, rootName = 'root') {
  function convert(obj, name) {
    if (obj === null) return `<${name}/>`;
    if (typeof obj !== 'object') {
      const escaped = String(obj).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return `<${name}>${escaped}</${name}>`;
    }
    if (Array.isArray(obj)) {
      return obj.map(item => convert(item, 'item')).join('');
    }
    let xml = `<${name}>`;
    for (let key in obj) {
      xml += convert(obj[key], key);
    }
    xml += `</${name}>`;
    return xml;
  }
  return '<?xml version="1.0" encoding="UTF-8"?>\n' + convert(obj, rootName);
}

function main(state) {
  try {
    const json = JSON.parse(state.text);
    state.text = jsonToXml(json);
  } catch (error) {
    state.postError("Failed to convert JSON to XML: " + error.message);
  }
}
