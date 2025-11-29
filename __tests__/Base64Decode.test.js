const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Base64Decode.js');

describe('Base64Decode', () => {
  test('decodes simple base64', () => {
    const result = executeScript(scriptPath, 'SGVsbG8gV29ybGQ=');
    assertEqual(result.result, 'Hello World');
  });

  test('decodes empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('decodes base64 with special characters', () => {
    const result = executeScript(scriptPath, 'SGVsbG8hQCMkJV4mKigp');
    assertEqual(result.result, 'Hello!@#$%^&*()');
  });

  test('decodes multiline base64', () => {
    const result = executeScript(scriptPath, 'TGluZSAxCkxpbmUgMgpMaW5lIDM=');
    assertEqual(result.result, 'Line 1\nLine 2\nLine 3');
  });

  test('decodes Unicode in base64', () => {
    const result = executeScript(scriptPath, 'SGVsbG8g5LiW55WMIPCfjI0=');
    assertEqual(result.result, 'Hello 世界 🌍');
  });
});
