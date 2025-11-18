const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'UniqueLines.js');

describe('UniqueLines', () => {
  test('removes duplicate lines', () => {
    const input = 'apple\nbanana\napple\norange\nbanana\napple';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'apple\nbanana\norange');
  });

  test('keeps first occurrence', () => {
    const input = 'first\nsecond\nfirst\nthird';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'first\nsecond\nthird');
  });

  test('handles no duplicates', () => {
    const input = 'one\ntwo\nthree';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'one\ntwo\nthree');
  });

  test('handles all duplicates', () => {
    const input = 'same\nsame\nsame';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'same');
  });

  test('handles empty lines', () => {
    const input = 'test\n\ntest\n\nother';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'test\n\nother');
  });
});
