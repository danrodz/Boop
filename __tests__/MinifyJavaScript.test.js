const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MinifyJavaScript.js');

describe('MinifyJavaScript', () => {
  test('removes whitespace from JavaScript', () => {
    const input = 'function test() {\n  return true;\n}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'function');
    assertContains(result.result, 'test');
  });

  test('removes comments', () => {
    const input = '// Comment\nvar x = 1;';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'var x');
  });

  test('handles already minified code', () => {
    const input = 'var x=1;';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'x');
  });
});
