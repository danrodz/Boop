const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JoinLines.js');

describe('JoinLines', () => {
  test('joins lines without delimiter', () => {
    const result = executeScript(scriptPath, 'Line 1\nLine 2\nLine 3');
    assertEqual(result.result, 'Line 1Line 2Line 3');
  });

  test('handles empty input', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'Single line only');
    assertEqual(result.result, 'Single line only');
  });
});
