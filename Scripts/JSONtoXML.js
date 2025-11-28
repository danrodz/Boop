/**
  {
    "api": 1,
    "name": "JSON to XML",
    "description": "Convert JSON to XML format",
    "author": "Boop",
    "icon": "doc",
    "tags": "json,xml,convert,format"
  }
**/

function main(state) {
  try {
    const json = JSON.parse(state.text);

    function escapeXml(value) {
      if (value === null || value === undefined) return '';
      return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
    }

    function toXml(obj, indent) {
      const spaces = '  '.repeat(indent);
      let xml = '';

      if (Array.isArray(obj)) {
        for (const item of obj) {
          xml += `${spaces}<item>\n`;
          xml += toXml(item, indent + 1);
          xml += `${spaces}</item>\n`;
        }
      } else if (obj && typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj)) {
          if (Array.isArray(value)) {
            for (const item of value) {
              xml += `${spaces}<${key}>\n`;
              xml += toXml(item, indent + 1);
              xml += `${spaces}</${key}>\n`;
            }
          } else if (value && typeof value === 'object') {
            xml += `${spaces}<${key}>\n`;
            xml += toXml(value, indent + 1);
            xml += `${spaces}</${key}>\n`;
          } else {
            xml += `${spaces}<${key}>${escapeXml(value)}</${key}>\n`;
          }
        }
      } else {
        xml += `${spaces}${escapeXml(obj)}\n`;
      }

      return xml;
    }

    let result = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';
    result += toXml(json, 1);
    result += '</root>';

    state.text = result;
    if (typeof state.postInfo === 'function') {
      state.postInfo("Converted to XML");
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Failed to convert JSON to XML: " + error.message);
    }
  }
}
