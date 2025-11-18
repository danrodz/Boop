const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ConvertForwardslashToBackslash.js');

describe('ConvertForwardslashToBackslash', () => {
  test('converts forward slashes to backslashes', () => {
    const result = executeScript(scriptPath, 'C:/Users/Test');
    assertEqual(result.result, 'C:\\Users\\Test');
  });

  test('handles Unix paths', () => {
    const result = executeScript(scriptPath, '/usr/local/bin');
    assertEqual(result.result, '\\usr\\local\\bin');
  });

  test('handles already converted paths', () => {
    const result = executeScript(scriptPath, 'C:\\Users\\Test');
    assertEqual(result.result, 'C:\\Users\\Test');
  });
});
