/**
  {
    "api": 1,
    "name": "Generate Random Boolean",
    "description": "Generates random true/false",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) { state.insert(String(Math.random() < 0.5)); }
