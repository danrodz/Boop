const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'EscapeJavaScript.js');

describe('EscapeJavaScript', () => {
  test('escapes single quotes', () => {
    const result = executeScript(scriptPath, "It's working");
    assertEqual(result.result, "It\\'s working");
  });

  test('escapes double quotes', () => {
    const result = executeScript(scriptPath, 'Say "Hello"');
    assertEqual(result.result, 'Say \\"Hello\\"');
  });

  test('escapes newlines', () => {
    const result = executeScript(scriptPath, 'Line1\nLine2');
    assertEqual(result.result, 'Line1\\nLine2');
  });

  test('escapes backslashes', () => {
    const result = executeScript(scriptPath, 'C:\\path');
    assertEqual(result.result, 'C:\\\\path');
  });
});
