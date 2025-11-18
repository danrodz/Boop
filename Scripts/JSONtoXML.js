/**
  {
    "api": 1,
    "name": "JSON to XML",
    "description": "Convert JSON to XML format",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "json,xml,convert"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function toXml(obj, rootName = 'root', indent = 0) {
      const spaces = '  '.repeat(indent);
      let xml = '';

      if (Array.isArray(obj)) {
        for (let item of obj) {
          xml += toXml(item, 'item', indent);
        }
      } else if (typeof obj === 'object' && obj !== null) {
        for (let [key, value] of Object.entries(obj)) {
          if (Array.isArray(value)) {
            for (let item of value) {
              xml += `${spaces}<${key}>\n`;
              xml += toXml(item, key, indent + 1);
              xml += `${spaces}</${key}>\n`;
            }
          } else if (typeof value === 'object' && value !== null) {
            xml += `${spaces}<${key}>\n`;
            xml += toXml(value, key, indent + 1);
            xml += `${spaces}</${key}>\n`;
          } else {
            xml += `${spaces}<${key}>${value}</${key}>\n`;
          }
        }
      } else {
        xml += `${spaces}${obj}\n`;
      }

      return xml;
    }

    const rootKey = Object.keys(json)[0];
    let result = '<?xml version="1.0" encoding="UTF-8"?>\n';
    result += `<${rootKey}>\n`;
    result += toXml(json[rootKey], rootKey, 1);
    result += `</${rootKey}>`;

    state.text = result;
  } catch (error) {
    state.postError("Failed to convert JSON to XML: " + error.message);
  }
}
