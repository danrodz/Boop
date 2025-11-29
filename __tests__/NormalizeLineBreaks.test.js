const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NormalizeLineBreaks.js');

describe('NormalizeLineBreaks', () => {
  test('normalizes line breaks to LF', () => {
    const result = executeScript(scriptPath, 'Line1\r\nLine2\rLine3\nLine4');
    assertContains(result.result, 'Line1');
    assertContains(result.result, 'Line2');
  });

  test('handles CRLF', () => {
    const result = executeScript(scriptPath, 'A\r\nB');
    assertEqual(result.result, 'A\nB');
  });

  test('handles CR', () => {
    const result = executeScript(scriptPath, 'A\rB');
    assertEqual(result.result, 'A\nB');
  });
});
