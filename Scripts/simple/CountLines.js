/**
  {
    "api": 1,
    "name": "Simple Line Count",
    "description": "Counts lines",
    "author": "Boop",
    "icon": "star",
    "tags": "utility"
  }
**/

function main(state) { state.text = String(state.text.split('\n').length); }
