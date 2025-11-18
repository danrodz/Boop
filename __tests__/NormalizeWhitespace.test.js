const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NormalizeWhitespace.js');

describe('NormalizeWhitespace', () => {
  test('replaces multiple spaces with single space', () => {
    const result = executeScript(scriptPath, 'Hello    World');
    assertEqual(result.result, 'Hello World');
  });

  test('replaces tabs with spaces', () => {
    const result = executeScript(scriptPath, 'Hello\t\tWorld');
    assertEqual(result.result, 'Hello World');
  });

  test('handles already normalized text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'Hello World');
  });

  test('handles mixed whitespace', () => {
    const result = executeScript(scriptPath, 'A  \t  B   C');
    assertEqual(result.result, 'A B C');
  });
});
