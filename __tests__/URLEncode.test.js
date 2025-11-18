const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'URLEncode.js');

describe('URLEncode', () => {
  test('encodes URL with spaces', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'Hello%20World');
  });

  test('encodes special characters', () => {
    const result = executeScript(scriptPath, 'user@example.com');
    assertEqual(result.result, 'user%40example.com');
  });

  test('encodes query parameters', () => {
    const result = executeScript(scriptPath, 'key=value&foo=bar');
    assertEqual(result.result, 'key%3Dvalue%26foo%3Dbar');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('encodes Unicode characters', () => {
    const result = executeScript(scriptPath, 'こんにちは');
    assertEqual(result.result, '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF');
  });
});
