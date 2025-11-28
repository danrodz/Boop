/**
  {
    "api": 1,
    "name": "ES Modules to CommonJS",
    "description": "Convert ES6 import/export to CommonJS require/module.exports",
    "author": "Boop",
    "icon": "code",
    "tags": "javascript,es6,commonjs,convert,modules"
  }
**/

function main(state) {
  let result = state.text;

  // import { named } from 'module'
  result = result.replace(/import\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g,
    'const { $1 } = require(\'$2\')');

  // import defaultExport from 'module'
  result = result.replace(/import\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g,
    'const $1 = require(\'$2\')');

  // import * as name from 'module'
  result = result.replace(/import\s+\*\s+as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g,
    'const $1 = require(\'$2\')');

  // export { named }
  result = result.replace(/export\s+\{([^}]+)\}/g, 'module.exports = { $1 }');

  // export default
  result = result.replace(/export\s+default\s+/g, 'module.exports = ');

  // export const/let/function
  result = result.replace(/export\s+(const|let|function)\s+(\w+)/g, '$1 $2');

  state.text = result;
  state.postInfo("Converted to CommonJS");
}
