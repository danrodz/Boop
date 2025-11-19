/**
  {
    "api": 1,
    "name": "Remove All Letters",
    "description": "Removes all letters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/[a-zA-Z]/g, ''); }
