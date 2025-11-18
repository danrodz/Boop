/**
  {
    "api": 1,
    "name": "Generate Random Integer",
    "description": "Generates random integer 0-100",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) { state.insert(String(Math.floor(Math.random() * 101))); }
