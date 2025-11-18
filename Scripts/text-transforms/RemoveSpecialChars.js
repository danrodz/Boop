/**
  {
    "api": 1,
    "name": "Remove Special Characters",
    "description": "Removes special characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/[^a-zA-Z0-9\s]/g, ''); }
