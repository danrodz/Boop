/**
  {
    "api": 1,
    "name": "XML to JSON",
    "description": "Convert XML to JSON format",
    "author": "Boop",
    "icon": "chevron.left.forwardslash.chevron.right",
    "tags": "xml,json,convert"
  }
**/

function main(state) {
  try {
    const xml = state.text.trim();

    function parseXml(xmlStr) {
      // Remove XML declaration
      xmlStr = xmlStr.replace(/<\?xml.*?\?>/g, '');

      // Simple XML to JSON parser
      const result = {};
      const tagRegex = /<(\w+)(?:\s+[^>]*)?>([^<]*)<\/\1>|<(\w+)(?:\s+[^>]*)?\/>/g;

      let match;
      while ((match = tagRegex.exec(xmlStr)) !== null) {
        const tagName = match[1] || match[3];
        const content = match[2] || '';

        if (!result[tagName]) {
          result[tagName] = content;
        } else if (Array.isArray(result[tagName])) {
          result[tagName].push(content);
        } else {
          result[tagName] = [result[tagName], content];
        }
      }

      return result;
    }

    const json = parseXml(xml);
    state.text = JSON.stringify(json, null, 2);
  } catch (error) {
    state.postError("Failed to parse XML: " + error.message);
  }
}
