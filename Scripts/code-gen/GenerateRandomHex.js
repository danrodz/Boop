/**
  {
    "api": 1,
    "name": "Generate Random Hex Color",
    "description": "Generates random hex color",
    "author": "Boop",
    "icon": "wand.and.stars",
    "tags": "generate,random,create,mock"
  }
**/

function main(state) { state.insert('#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')); }
