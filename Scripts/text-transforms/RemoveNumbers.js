/**
  {
    "api": 1,
    "name": "Remove All Numbers",
    "description": "Removes all digits",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/\d/g, ''); }
