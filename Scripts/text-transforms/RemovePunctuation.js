/**
  {
    "api": 1,
    "name": "Remove Punctuation",
    "description": "Removes punctuation",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/[.,!?;:'"()-]/g, ''); }
