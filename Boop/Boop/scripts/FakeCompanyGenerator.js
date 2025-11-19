/**
  {
    "api": 1,
    "name": "Fake Company Generator",
    "description": "Generate fake company names for testing",
    "author": "Boop",
    "icon": "building.2",
    "tags": "fake,company,business,generate,mock"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 10;

    if (count < 1 || count > 100) {
      state.postError("Count must be between 1 and 100");
      return;
    }

    const adjectives = ['Global', 'Premier', 'Advanced', 'Dynamic', 'Strategic', 'Innovative', 'Superior', 'Elite', 'Prime', 'Unified'];
    const nouns = ['Solutions', 'Systems', 'Technologies', 'Industries', 'Enterprises', 'Services', 'Group', 'Corporation', 'Partners', 'Associates'];
    const descriptors = ['Tech', 'Digital', 'Cloud', 'Data', 'Smart', 'Cyber', 'Web', 'Mobile', 'AI', 'Net'];
    const suffixes = ['Inc.', 'LLC', 'Corp.', 'Ltd.', 'Co.', 'Group', 'Holdings'];

    const companies = [];

    for (let i = 0; i < count; i++) {
      const patterns = [
        () => {
          const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
          const noun = nouns[Math.floor(Math.random() * nouns.length)];
          const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
          return `${adj} ${noun} ${suffix}`;
        },
        () => {
          const desc = descriptors[Math.floor(Math.random() * descriptors.length)];
          const noun = nouns[Math.floor(Math.random() * nouns.length)];
          const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
          return `${desc}${noun} ${suffix}`;
        },
        () => {
          const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
          const noun = nouns[Math.floor(Math.random() * nouns.length)];
          const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
          return `${letter}${letter}${letter} ${noun} ${suffix}`;
        }
      ];

      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      companies.push(pattern());
    }

    state.text = companies.join('\n');
    state.postInfo(`Generated ${count} fake company name(s)`);
  } catch (error) {
    state.postError("Error generating company names: " + error.message);
  }
}
