/**
  {
    "api": 1,
    "name": "Remove Extra Spaces",
    "description": "Collapses multiple spaces",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/\s+/g, ' ').trim(); }
