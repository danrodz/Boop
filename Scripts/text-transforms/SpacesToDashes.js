/**
  {
    "api": 1,
    "name": "Spaces to Dashes",
    "description": "Replaces spaces with dashes",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/\s+/g, '-'); }
