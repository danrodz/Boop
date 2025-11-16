const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'jsToPhp.js');

describe('jsToPhp', () => {
  test('converts JS object to PHP array', () => {
    const result = executeScript(scriptPath, "{name: 'Alice', age: 25}");
    // PHP uses [ ] for arrays, not the word "array"
    assertContains(result.result, "'name' => ");
    assertContains(result.result, "'age' => ");
    assertContains(result.result, '// Result:');
  });

  test('converts JS array to PHP array', () => {
    const result = executeScript(scriptPath, "[1, 2, 3]");
    assertContains(result.result, '[');
    assertContains(result.result, ']');
    assertContains(result.result, '// Result:');
  });
});
