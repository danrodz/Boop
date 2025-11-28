const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'EscapeJSON.js');

describe('EscapeJSON', () => {
  test('escapes double quotes', () => {
    const result = executeScript(scriptPath, 'Hello "World"');
    assertEqual(result.result, 'Hello \\"World\\"');
  });

  test('escapes backslashes', () => {
    const result = executeScript(scriptPath, 'C:\\path\\file');
    assertEqual(result.result, 'C:\\\\path\\\\file');
  });

  test('escapes newlines and tabs', () => {
    const result = executeScript(scriptPath, 'Line1\nLine2\tTab');
    assertEqual(result.result, 'Line1\\nLine2\\tTab');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });
});
