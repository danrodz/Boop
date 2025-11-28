const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'SHA1.js');

describe('SHA1', () => {
  test('generates SHA1 hash for simple text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, '0a4d55a8d778e5022fab701977c5d840bbc486d0');
  });

  test('generates SHA1 hash for empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, 'da39a3ee5e6b4b0d3255bfef95601890afd80709');
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
