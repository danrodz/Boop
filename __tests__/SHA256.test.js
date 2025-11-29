const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'SHA256.js');

describe('SHA256', () => {
  test('generates SHA256 hash for simple text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e');
  });

  test('generates SHA256 hash for empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855');
  });

  test('generates consistent hash for same input', () => {
    const result1 = executeScript(scriptPath, 'test');
    const result2 = executeScript(scriptPath, 'test');
    assertEqual(result1.result, result2.result);
  });

  test('generates different hashes for different inputs', () => {
    const result1 = executeScript(scriptPath, 'test');
    const result2 = executeScript(scriptPath, 'Test');
    assertEqual(result1.result !== result2.result, true);
  });
});
