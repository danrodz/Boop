/**
  {
    "api": 1,
    "name": "XML to JSON",
    "description": "Convert simple XML to JSON format",
    "author": "Boop",
    "icon": "doc",
    "tags": "xml,json,convert,format"
  }
**/

function main(state) {
  try {
    const xml = state.text.trim();

    function addValue(obj, key, value) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (Array.isArray(obj[key])) {
          obj[key].push(value);
        } else {
          obj[key] = [obj[key], value];
        }
      } else {
        obj[key] = value;
      }
    }

    function parseXML(str) {
      const result = {};
      const selfClosingPattern = /<([^>\s/]+)([^>]*)\/>/g;
      const tagPattern = /<([^>\s/]+)([^>]*)>([\s\S]*?)<\/\1>/g;

      let match;

      // Self-closing tags
      while ((match = selfClosingPattern.exec(str)) !== null) {
        const tag = match[1];
        addValue(result, tag, null);
      }

      // Regular tags
      tagPattern.lastIndex = 0;
      while ((match = tagPattern.exec(str)) !== null) {
        const tag = match[1];
        const content = match[3];
        const trimmed = content.trim();

        let value;
        if (trimmed.startsWith('<')) {
          value = parseXML(trimmed);
        } else {
          value = trimmed;
        }

        addValue(result, tag, value);
      }

      return result;
    }

    const cleaned = xml.replace(/<\?xml[\s\S]*?\?>/i, '').trim();
    const json = parseXML(cleaned);

    state.text = JSON.stringify(json, null, 2);
    if (typeof state.postInfo === 'function') {
      state.postInfo("Converted to JSON");
    }
  } catch (error) {
    if (typeof state.postError === 'function') {
      state.postError("Error parsing XML: " + error.message);
    }
  }
}
