const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'DoubleQuotesToSingle.js');

describe('DoubleQuotesToSingle', () => {
  test('converts double quotes to single', () => {
    const result = executeScript(scriptPath, 'He said "Hello"');
    assertEqual(result.result, "He said 'Hello'");
  });

  test('handles multiple double quotes', () => {
    const result = executeScript(scriptPath, '"Hello" "World"');
    assertEqual(result.result, "'Hello' 'World'");
  });

  test('handles no quotes', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'Hello World');
  });
});
