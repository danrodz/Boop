const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'PrefixLines.js');

describe('PrefixLines', () => {
  test('adds prefix to each line', () => {
    const result = executeScript(scriptPath, 'Line1\nLine2\nLine3');
    assertContains(result.result, 'Line1');
    assertContains(result.result, 'Line2');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertContains(result.result, 'Hello');
  });

  test('handles empty lines', () => {
    const result = executeScript(scriptPath, 'Line1\n\nLine3');
    assertContains(result.result, 'Line1');
  });
});
