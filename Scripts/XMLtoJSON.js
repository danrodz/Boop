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

    // Simple XML parser (handles basic cases)
    function parseXML(xml) {
      const tagPattern = /<([^>\s]+)([^>]*)>([\s\S]*?)<\/\1>/g;
      const selfClosingPattern = /<([^>\s]+)([^>]*?)\/>/g;
      const result = {};

      // Handle self-closing tags
      let match;
      while ((match = selfClosingPattern.exec(xml)) !== null) {
        result[match[1]] = null;
      }

      // Handle regular tags
      tagPattern.lastIndex = 0;
      while ((match = tagPattern.exec(xml)) !== null) {
        const [, tag, , content] = match;

        // Check if content has nested tags
        if (content.includes('<')) {
          result[tag] = parseXML(content);
        } else {
          result[tag] = content.trim();
        }
      }

      return result;
    }

    const json = parseXML(xml);
    state.text = JSON.stringify(json, null, 2);
    state.postInfo("Converted to JSON");
  } catch (error) {
    state.postError(`Error parsing XML: ${error.message}`);
  }
}
