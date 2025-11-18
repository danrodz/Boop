/**
  {
    "api": 1,
    "name": "Generate User Agent",
    "description": "Generates simple user agent",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) {
  const agents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Safari/14.1',
    'Mozilla/5.0 (X11; Linux x86_64) Firefox/89.0'
  ];
  state.insert(agents[Math.floor(Math.random() * agents.length)]);
}
