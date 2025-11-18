/**
  {
    "api": 1,
    "name": "Remove Line Breaks",
    "description": "Removes all line breaks",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,text,transform"
  }
**/

function main(state) { state.text = state.text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim(); }
