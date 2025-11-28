const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MinifyCSS.js');

describe('MinifyCSS', () => {
  test('minifies formatted CSS', () => {
    const input = '.class {\n  color: red;\n  background: blue;\n}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '.class{color:red;background:blue');
  });

  test('minifies CSS with multiple selectors', () => {
    const input = '.class1 {\n  color: red;\n}\n.class2 {\n  color: blue;\n}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '.class1{color:red');
    assertContains(result.result, '.class2{color:blue');
  });

  test('removes comments from CSS', () => {
    const input = '/* Comment */ .class { color: red; }';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '.class{color:red');
  });
});
