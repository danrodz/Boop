const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Base64Encode.js');

describe('Base64Encode', () => {
  test('encodes simple text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'SGVsbG8gV29ybGQ=');
  });

  test('encodes empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('encodes text with special characters', () => {
    const result = executeScript(scriptPath, 'Hello!@#$%^&*()');
    assertEqual(result.result, 'SGVsbG8hQCMkJV4mKigp');
  });

  test('encodes multiline text', () => {
    const result = executeScript(scriptPath, 'Line 1\nLine 2\nLine 3');
    assertEqual(result.result, 'TGluZSAxCkxpbmUgMgpMaW5lIDM=');
  });

  test('encodes Unicode characters', () => {
    const result = executeScript(scriptPath, 'Hello 世界 🌍');
    assertEqual(result.result, 'SGVsbG8g5LiW55WMIPCfjI0=');
  });
});
