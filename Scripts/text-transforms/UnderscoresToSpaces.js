/**
  {
    "api": 1,
    "name": "Underscores to Spaces",
    "description": "Replaces underscores with spaces",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/_/g, ' '); }
