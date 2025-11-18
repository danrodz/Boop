const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'FormatCSS.js');

describe('FormatCSS', () => {
  test('formats minified CSS', () => {
    const input = '.class{color:red;background:blue;}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'color: red');
    assertContains(result.result, 'background: blue');
  });

  test('formats CSS with multiple selectors', () => {
    const input = '.class1{color:red;}.class2{color:blue;}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '.class1');
    assertContains(result.result, '.class2');
  });

  test('handles already formatted CSS', () => {
    const input = '.class {\n  color: red;\n}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'color: red');
  });
});
