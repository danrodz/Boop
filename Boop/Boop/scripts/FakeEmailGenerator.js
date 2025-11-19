/**
  {
    "api": 1,
    "name": "Fake Email Generator",
    "description": "Generate fake email addresses for testing",
    "author": "Boop",
    "icon": "envelope",
    "tags": "fake,email,generate,mock,test"
  }
**/

function main(state) {
  try {
    const count = parseInt(state.text.trim()) || 10;

    if (count < 1 || count > 100) {
      state.postError("Count must be between 1 and 100");
      return;
    }

    const firstNames = ['john', 'jane', 'mike', 'sarah', 'alex', 'emma', 'david', 'lisa', 'chris', 'amy'];
    const lastNames = ['smith', 'johnson', 'williams', 'brown', 'jones', 'garcia', 'miller', 'davis', 'wilson', 'moore'];
    const domains = ['example.com', 'test.com', 'demo.org', 'sample.net', 'fake.io', 'mock.dev'];

    const emails = [];

    for (let i = 0; i < count; i++) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      const domain = domains[Math.floor(Math.random() * domains.length)];
      const num = Math.floor(Math.random() * 1000);

      const patterns = [
        `${first}.${last}@${domain}`,
        `${first}${last}@${domain}`,
        `${first}.${last}${num}@${domain}`,
        `${first[0]}${last}@${domain}`,
        `${first}_${last}@${domain}`
      ];

      const email = patterns[Math.floor(Math.random() * patterns.length)];
      emails.push(email);
    }

    state.text = emails.join('\n');
    state.postInfo(`Generated ${count} fake email(s)`);
  } catch (error) {
    state.postError("Error generating emails: " + error.message);
  }
}
