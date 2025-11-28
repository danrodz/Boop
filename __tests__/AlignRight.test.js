const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'AlignRight.js');

describe('AlignRight', () => {
  test('aligns text to right by adding leading spaces', () => {
    const result = executeScript(scriptPath, 'Hello\nWorld\nTest');
    assertContains(result.result, 'Hello');
    assertContains(result.result, 'World');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertContains(result.result, 'Hello');
  });

  test('aligns lines of different lengths', () => {
    const result = executeScript(scriptPath, 'A\nBB\nCCC');
    assertContains(result.result, 'A');
    assertContains(result.result, 'BB');
  });
});
