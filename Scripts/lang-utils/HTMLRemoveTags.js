/**
  {
    "api": 1,
    "name": "Remove HTML Tags",
    "description": "Strips all HTML tags",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) { state.text = state.text.replace(/<[^>]*>/g, ''); }
