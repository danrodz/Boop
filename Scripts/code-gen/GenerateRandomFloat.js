/**
  {
    "api": 1,
    "name": "Generate Random Float",
    "description": "Generates random float 0-1",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) { state.insert(String(Math.random())); }
