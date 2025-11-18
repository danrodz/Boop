/**
  {
    "api": 1,
    "name": "Insert Current Date",
    "description": "Inserts current date",
    "author": "Boop",
    "icon": "star",
    "tags": "utility,quick,insert"
  }
**/

function main(state) { state.insert(new Date().toLocaleDateString()); }
