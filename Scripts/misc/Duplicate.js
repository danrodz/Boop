/**
  {
    "api": 1,
    "name": "Duplicate Text",
    "description": "Duplicates the text",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.text = state.text + state.text; }
