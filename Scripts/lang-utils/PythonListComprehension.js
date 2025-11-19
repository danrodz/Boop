/**
  {
    "api": 1,
    "name": "Python List Comprehension",
    "description": "Creates list comprehension template",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "programming,code,language,format,escape"
  }
**/

function main(state) {
  const var_name = state.text.trim() || 'x';
  state.text = \`[\${var_name} for \${var_name} in iterable]\`;
}
