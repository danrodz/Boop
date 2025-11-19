/**
  {
    "api": 1,
    "name": "Generate Random RGB",
    "description": "Generates random RGB color",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  state.insert(\`rgb(\${r}, \${g}, \${b})\`);
}
