/**
  {
    "api": 1,
    "name": "Generate Random Email",
    "description": "Generates a random email address",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create"
  }
**/

function main(state) {
  const names = ['john', 'jane', 'bob', 'alice', 'charlie'];
  const domains = ['example.com', 'test.com', 'demo.com'];
  const name = names[Math.floor(Math.random() * names.length)];
  const domain = domains[Math.floor(Math.random() * domains.length)];
  const num = Math.floor(Math.random() * 1000);
  state.insert(\`\${name}\${num}@\${domain}\`);
}
