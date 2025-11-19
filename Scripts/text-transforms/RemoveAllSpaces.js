/**
  {
    "api": 1,
    "name": "Remove All Spaces",
    "description": "Removes all whitespace",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/\s/g, ''); }
