const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'IndentLines.js');

describe('IndentLines', () => {
  test('indents all lines with spaces', () => {
    const result = executeScript(scriptPath, 'Line1\nLine2\nLine3');
    assertEqual(result.result, '  Line1\n  Line2\n  Line3');
  });

  test('indents single line', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertEqual(result.result, '  Hello');
  });

  test('handles empty lines', () => {
    const result = executeScript(scriptPath, 'Line1\n\nLine3');
    assertEqual(result.result, '  Line1\n  \n  Line3');
  });
});
