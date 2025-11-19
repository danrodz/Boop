/**
  {
    "api": 1,
    "name": "Fake API Key Generator",
    "description": "Generate fake API keys for testing",
    "author": "Boop",
    "icon": "key",
    "tags": "fake,api,key,generate,mock,test"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 5;

    if (count < 1 || count > 50) {
      state.postError("Count must be between 1 and 50");
      return;
    }

    const keys = [];

    for (let i = 0; i < count; i++) {
      const formats = [
        // Standard hex key
        () => {
          let key = '';
          for (let j = 0; j < 32; j++) {
            key += Math.floor(Math.random() * 16).toString(16);
          }
          return key;
        },
        // UUID-style
        () => {
          const seg = () => Math.floor(Math.random() * 65536).toString(16).padStart(4, '0');
          return `${seg()}${seg()}-${seg()}-${seg()}-${seg()}-${seg()}${seg()}${seg()}`;
        },
        // Base64-style
        () => {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
          let key = '';
          for (let j = 0; j < 40; j++) {
            key += chars[Math.floor(Math.random() * chars.length)];
          }
          return key;
        },
        // Prefixed key
        () => {
          const prefix = ['sk', 'pk', 'ak', 'test'][Math.floor(Math.random() * 4)];
          let key = '';
          for (let j = 0; j < 32; j++) {
            key += Math.floor(Math.random() * 16).toString(16);
          }
          return `${prefix}_${key}`;
        }
      ];

      const format = formats[Math.floor(Math.random() * formats.length)];
      keys.push(format());
    }

    state.text = keys.join('\n');
    state.postInfo(`Generated ${count} fake API key(s)`);
  } catch (error) {
    state.postError("Error generating API keys: " + error.message);
  }
}
