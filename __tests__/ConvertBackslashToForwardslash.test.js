const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ConvertBackslashToForwardslash.js');

describe('ConvertBackslashToForwardslash', () => {
  test('converts backslashes to forward slashes', () => {
    const result = executeScript(scriptPath, 'C:\\Users\\Test');
    assertEqual(result.result, 'C:/Users/Test');
  });

  test('handles Windows paths', () => {
    const result = executeScript(scriptPath, 'C:\\Program Files\\App');
    assertEqual(result.result, 'C:/Program Files/App');
  });

  test('handles already converted paths', () => {
    const result = executeScript(scriptPath, 'C:/Users/Test');
    assertEqual(result.result, 'C:/Users/Test');
  });
});
