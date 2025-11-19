/**
  {
    "api": 1,
    "name": "Spaces to Tabs",
    "description": "Replaces 4 spaces with tabs",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/    /g, '\t'); }
