/**
  {
    "api": 1,
    "name": "API Key Generator",
    "description": "Generate secure random API key",
    "author": "Boop",
    "icon": "key.horizontal",
    "tags": "api,key,generate,random,secret"
  }
**/

function main(state) {
  try {
    const length = parseInt(state.text) || 32;

    function generateKey(len, charset) {
      let key = '';
      for (let i = 0; i < len; i++) {
        key += charset[Math.floor(Math.random() * charset.length)];
      }
      return key;
    }

    const alphanumeric = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const hexChars = '0123456789abcdef';
    const base62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let result = `=== API KEYS ===\n\n`;
    result += `Alphanumeric (${length} chars):\n`;
    result += generateKey(length, alphanumeric) + '\n\n';
    result += `Hexadecimal (${length} chars):\n`;
    result += generateKey(length, hexChars) + '\n\n';
    result += `Base62 (${length} chars):\n`;
    result += generateKey(length, base62) + '\n\n';
    result += `UUID-style:\n`;
    const uuid = generateKey(8, hexChars) + '-' + generateKey(4, hexChars) + '-' +
                 generateKey(4, hexChars) + '-' + generateKey(4, hexChars) + '-' +
                 generateKey(12, hexChars);
    result += uuid;

    state.text = result;
  } catch (error) {
    state.postError("Failed to generate: " + error.message);
  }
}
