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
    const obj = JSON.parse(state.text);

    function toXML(obj, rootName = 'root') {
      let xml = `<${rootName}>`;

      if (typeof obj === 'object' && obj !== null) {
        if (Array.isArray(obj)) {
          obj.forEach(item => {
            xml += toXML(item, 'item');
          });
        } else {
          Object.entries(obj).forEach(([key, value]) => {
            if (typeof value === 'object' && value !== null) {
              xml += toXML(value, key);
            } else {
              xml += `<${key}>${value}</${key}>`;
            }
          });
        }
      } else {
        xml += obj;
      }

      xml += `</${rootName}>`;
      return xml;
    }

    state.text = toXML(obj);
    state.postInfo("Converted to XML");
  } catch (error) {
    state.postError(`Invalid JSON: ${error.message}`);
  }
}
