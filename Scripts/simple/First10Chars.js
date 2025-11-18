/**
  {
    "api": 1,
    "name": "First 10 Characters",
    "description": "Gets first 10 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility"
  }
**/

function main(state) { state.text = state.text.slice(0, 10); }
