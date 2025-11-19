/**
  {
    "api": 1,
    "name": "Add JSDoc Comment",
    "description": "Adds JSDoc template",
    "author": "Boop",
    "icon": "curlybraces",
    "tags": "code,programming,javascript,python,format"
  }
**/

function main(state) {
  const jsdoc = \`/**
 * Description
 * @param {type} param - Description
 * @returns {type} Description
 */\`;
  state.text = jsdoc + '\n' + state.text;
}
