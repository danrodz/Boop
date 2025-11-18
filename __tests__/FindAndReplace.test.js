const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'FindAndReplace.js');

describe('FindAndReplace', () => {
  test('replaces literal text', () => {
    const input = 'old\nnew\nThis is old text with old values';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'This is new text with new values');
  });

  test('replaces with regex', () => {
    const input = '\\d+\nNUMBER\nI have 5 apples and 10 oranges';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'I have NUMBER apples and NUMBER oranges');
  });

  test('requires at least 3 lines', () => {
    const input = 'find\nreplace';
    const result = executeScript(scriptPath, input);
    assertTrue(result.errors.length > 0);
  });

  test('handles no matches (returns unchanged)', () => {
    const input = 'xyz\nabc\nHello World';
    const result = executeScript(scriptPath, input);
    // When pattern not found, tries as regex which doesn't match, so text unchanged
    assertEqual(result.result, 'Hello World');
  });

  test('replaces all occurrences', () => {
    const input = 'test\nTEST\ntest test test';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'TEST TEST TEST');
  });
});
