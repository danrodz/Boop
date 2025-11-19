/**
  {
    "api": 1,
    "name": "Dashes to Spaces",
    "description": "Replaces dashes with spaces",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/-/g, ' '); }
