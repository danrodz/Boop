/**
  {
    "api": 1,
    "name": "Add TODO Comment",
    "description": "Adds TODO comment",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  state.insert('// TODO: ');
}
