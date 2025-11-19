/**
  {
    "api": 1,
    "name": "Fake Domain Generator",
    "description": "Generate fake domain names for testing",
    "author": "Boop",
    "icon": "globe",
    "tags": "fake,domain,generate,mock,test"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 10;

    if (count < 1 || count > 100) {
      state.postError("Count must be between 1 and 100");
      return;
    }

    const words = ['tech', 'web', 'cloud', 'data', 'app', 'digital', 'smart', 'net', 'cyber', 'info', 'online', 'mobile', 'fast', 'easy', 'quick'];
    const tlds = ['.com', '.net', '.org', '.io', '.dev', '.app', '.tech', '.co'];

    const domains = [];

    for (let i = 0; i < count; i++) {
      const patterns = [
        // word + word + tld
        () => {
          const word1 = words[Math.floor(Math.random() * words.length)];
          const word2 = words[Math.floor(Math.random() * words.length)];
          const tld = tlds[Math.floor(Math.random() * tlds.length)];
          return `${word1}${word2}${tld}`;
        },
        // word + number + tld
        () => {
          const word = words[Math.floor(Math.random() * words.length)];
          const num = Math.floor(Math.random() * 1000);
          const tld = tlds[Math.floor(Math.random() * tlds.length)];
          return `${word}${num}${tld}`;
        },
        // random letters + tld
        () => {
          const length = 5 + Math.floor(Math.random() * 5);
          let name = '';
          for (let j = 0; j < length; j++) {
            name += String.fromCharCode(97 + Math.floor(Math.random() * 26));
          }
          const tld = tlds[Math.floor(Math.random() * tlds.length)];
          return `${name}${tld}`;
        }
      ];

      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      domains.push(pattern());
    }

    state.text = domains.join('\n');
    state.postInfo(`Generated ${count} fake domain(s)`);
  } catch (error) {
    state.postError("Error generating domains: " + error.message);
  }
}
