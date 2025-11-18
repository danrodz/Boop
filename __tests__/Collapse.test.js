const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Collapse.js');

describe('Collapse', () => {
  test('joins lines into single line', () => {
    const result = executeScript(scriptPath, 'Line1\nLine2\nLine3');
    assertEqual(result.result, 'Line1Line2Line3');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertEqual(result.result, 'Hello');
  });

  test('removes all newlines', () => {
    const result = executeScript(scriptPath, 'A\nB\nC\nD');
    assertEqual(result.result, 'ABCD');
  });

  test('handles empty lines', () => {
    const result = executeScript(scriptPath, 'A\n\nB');
    assertEqual(result.result, 'AB');
  });
});
