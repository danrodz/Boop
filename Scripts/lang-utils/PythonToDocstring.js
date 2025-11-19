/**
  {
    "api": 1,
    "name": "Add Python Docstring",
    "description": "Adds docstring template",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  const lines = state.text.split('\n');
  const result = ['"""', 'Description of function', '', 'Args:', '    param: Description', '', 'Returns:', '    Description of return value', '"""', ...lines];
  state.text = result.join('\n');
}
