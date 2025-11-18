/**
  {
    "api": 1,
    "name": "Spaces to Underscores",
    "description": "Replaces spaces with underscores",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/\s+/g, '_'); }
