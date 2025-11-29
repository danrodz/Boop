const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'AlignLeft.js');

describe('AlignLeft', () => {
  test('aligns text to left by removing leading spaces', () => {
    const result = executeScript(scriptPath, '   Hello\n  World\n Test');
    assertEqual(result.result, 'Hello\nWorld\nTest');
  });

  test('handles already left-aligned text', () => {
    const result = executeScript(scriptPath, 'Hello\nWorld');
    assertEqual(result.result, 'Hello\nWorld');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, '   Hello');
    assertEqual(result.result, 'Hello');
  });

  test('handles tabs', () => {
    const result = executeScript(scriptPath, '\t\tHello\n\tWorld');
    assertEqual(result.result, 'Hello\nWorld');
  });
});
