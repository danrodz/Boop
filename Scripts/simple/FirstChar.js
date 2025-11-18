/**
  {
    "api": 1,
    "name": "Get First Character",
    "description": "Gets first character",
    "author": "Boop",
    "icon": "star",
    "tags": "utility"
  }
**/

function main(state) { state.text = state.text.charAt(0); }
