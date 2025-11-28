const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'SHA512.js');

describe('SHA512', () => {
  test('generates SHA512 hash for simple text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result.length, 128); // SHA512 produces 128 hex characters
  });

  test('generates SHA512 hash for empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, 'cf83e1357eefb8bdf1542850d66d8007d620e4050b5715dc83f4a921d36ce9ce47d0d13c5d85f2b0ff8318d2877eec2f63b931bd47417a81a538327af927da3e');
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
