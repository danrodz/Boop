/**
  {
    "api": 1,
    "name": "Tabs to Spaces (4)",
    "description": "Replaces tabs with 4 spaces",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/\t/g, '    '); }
