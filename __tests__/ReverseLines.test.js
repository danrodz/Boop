const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ReverseLines.js');

describe('ReverseLines', () => {
  test('reverses order of lines', () => {
    const result = executeScript(scriptPath, 'First\nSecond\nThird');
    assertEqual(result.result, 'Third\nSecond\nFirst');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertEqual(result.result, 'Hello');
  });

  test('handles two lines', () => {
    const result = executeScript(scriptPath, 'A\nB');
    assertEqual(result.result, 'B\nA');
  });

  test('handles empty lines', () => {
    const result = executeScript(scriptPath, 'A\n\nB');
    assertEqual(result.result, 'B\n\nA');
  });
});
