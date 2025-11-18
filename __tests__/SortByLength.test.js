const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'SortByLength.js');

describe('SortByLength', () => {
  test('sorts lines by length (shortest first)', () => {
    const input = 'long line here\nshort\nmedium line';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'short\nmedium line\nlong line here');
  });

  test('maintains order for equal-length lines', () => {
    const input = 'abc\ndef\nghi';
    const result = executeScript(scriptPath, input);
    // All same length, should maintain order
    assertEqual(result.result, 'abc\ndef\nghi');
  });

  test('handles empty lines', () => {
    const input = 'hello\n\nworld\n';
    const result = executeScript(scriptPath, input);
    const lines = result.result.split('\n');
    // Empty lines should be first
    assertEqual(lines[0], '');
    assertEqual(lines[1], '');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'single line');
    assertEqual(result.result, 'single line');
  });

  test('sorts complex multi-line text', () => {
    const input = 'This is a very long line\nShort\nMedium length line\na';
    const result = executeScript(scriptPath, input);
    const lines = result.result.split('\n');
    assertEqual(lines[0], 'a');
    assertEqual(lines[1], 'Short');
    assertEqual(lines[2], 'Medium length line');
    assertEqual(lines[3], 'This is a very long line');
  });
});
