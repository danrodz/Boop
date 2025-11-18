const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'AddSlashes.js');

describe('AddSlashes', () => {
  test('adds slashes before quotes', () => {
    const result = executeScript(scriptPath, 'Say "Hello"');
    assertEqual(result.result, 'Say \\"Hello\\"');
  });

  test('adds slashes before single quotes', () => {
    const result = executeScript(scriptPath, "It's working");
    assertEqual(result.result, "It\\'s working");
  });

  test('handles backslashes', () => {
    const result = executeScript(scriptPath, 'C:\\path');
    assertEqual(result.result, 'C:\\\\path');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });
});
