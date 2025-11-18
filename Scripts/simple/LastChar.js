/**
  {
    "api": 1,
    "name": "Get Last Character",
    "description": "Gets last character",
    "author": "Boop",
    "icon": "star",
    "tags": "utility"
  }
**/

function main(state) { state.text = state.text.charAt(state.text.length - 1); }
