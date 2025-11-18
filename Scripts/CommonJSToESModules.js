/**
  {
    "api": 1,
    "name": "CommonJS to ES Modules",
    "description": "Convert CommonJS require/exports to ES6 import/export",
    "author": "Boop",
    "icon": "code",
    "tags": "javascript,es6,commonjs,convert,modules"
  }
**/

function main(state) {
  let result = state.text;

  // const { named } = require('module')
  result = result.replace(/const\s+\{([^}]+)\}\s+=\s+require\(['"]([^'"]+)['"]\)/g,
    'import { $1 } from \'$2\'');

  // const name = require('module')
  result = result.replace(/const\s+(\w+)\s+=\s+require\(['"]([^'"]+)['"]\)/g,
    'import $1 from \'$2\'');

  // module.exports = { named }
  result = result.replace(/module\.exports\s+=\s+\{([^}]+)\}/g, 'export { $1 }');

  // module.exports = value
  result = result.replace(/module\.exports\s+=\s+/g, 'export default ');

  // exports.name = value
  result = result.replace(/exports\.(\w+)\s+=\s+/g, 'export const $1 = ');

  state.text = result;
  state.postInfo("Converted to ES Modules");
}
