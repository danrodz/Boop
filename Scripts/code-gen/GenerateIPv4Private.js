/**
  {
    "api": 1,
    "name": "Generate Private IPv4",
    "description": "Generates private IPv4 address",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) {
  const prefixes = ['10', '172.16', '192.168'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const parts = prefix.split('.');
  while (parts.length < 4) {
    parts.push(String(Math.floor(Math.random() * 256)));
  }
  state.insert(parts.join('.'));
}
