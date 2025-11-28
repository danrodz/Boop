const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'URLDecode.js');

describe('URLDecode', () => {
  test('decodes URL with spaces', () => {
    const result = executeScript(scriptPath, 'Hello%20World');
    assertEqual(result.result, 'Hello World');
  });

  test('decodes special characters', () => {
    const result = executeScript(scriptPath, 'user%40example.com');
    assertEqual(result.result, 'user@example.com');
  });

  test('decodes query parameters', () => {
    const result = executeScript(scriptPath, 'key%3Dvalue%26foo%3Dbar');
    assertEqual(result.result, 'key=value&foo=bar');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('decodes Unicode characters', () => {
    const result = executeScript(scriptPath, '%E3%81%93%E3%82%93%E3%81%AB%E3%81%A1%E3%81%AF');
    assertEqual(result.result, 'こんにちは');
  });
});
