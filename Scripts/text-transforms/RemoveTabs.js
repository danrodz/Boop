/**
  {
    "api": 1,
    "name": "Remove Tabs",
    "description": "Removes all tabs",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/\t/g, ' '); }
