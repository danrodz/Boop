/**
  {
    "api": 1,
    "name": "Plist to JSON",
    "description": "Convert Apple Property List (XML) to JSON",
    "author": "Boop",
    "icon": "doc.text",
    "tags": "plist,json,apple,xml,convert"
  }
**/

function main(state) {
  try {
    const plist = state.text;

    function parsePlistValue(xmlStr, startTag) {
      const regex = new RegExp(`<${startTag}>(.*?)</${startTag}>`, 's');
      const match = xmlStr.match(regex);
      if (!match) return null;

      if (startTag === 'string') return match[1];
      if (startTag === 'integer') return parseInt(match[1]);
      if (startTag === 'real') return parseFloat(match[1]);
      if (startTag === 'true') return true;
      if (startTag === 'false') return false;

      return match[1];
    }

    // Simple plist parser for basic types
    const result = {};
    const dictMatch = plist.match(/<dict>(.*?)<\/dict>/s);

    if (dictMatch) {
      const content = dictMatch[1];
      const keyRegex = /<key>(.*?)<\/key>/g;
      const keys = [];
      let match;

      while ((match = keyRegex.exec(content)) !== null) {
        keys.push(match[1]);
      }

      for (let key of keys) {
        // Try different value types
        const keyIndex = content.indexOf(`<key>${key}</key>`);
        const afterKey = content.substring(keyIndex + `<key>${key}</key>`.length);

        if (afterKey.includes('<string>')) {
          result[key] = parsePlistValue(afterKey, 'string');
        } else if (afterKey.includes('<integer>')) {
          result[key] = parsePlistValue(afterKey, 'integer');
        } else if (afterKey.includes('<real>')) {
          result[key] = parsePlistValue(afterKey, 'real');
        } else if (afterKey.includes('<true/>')) {
          result[key] = true;
        } else if (afterKey.includes('<false/>')) {
          result[key] = false;
        }
      }
    }

    state.text = JSON.stringify(result, null, 2);
  } catch (error) {
    state.postError("Failed to parse Plist: " + error.message);
  }
}
