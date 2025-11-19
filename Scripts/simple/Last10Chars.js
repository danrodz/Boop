/**
  {
    "api": 1,
    "name": "Last 10 Characters",
    "description": "Gets last 10 characters",
    "author": "Boop",
    "icon": "star",
    "tags": "utility"
  }
**/

function main(state) { state.text = state.text.slice(-10); }
