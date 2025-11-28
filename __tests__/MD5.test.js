const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MD5.js');

describe('MD5', () => {
  test('generates MD5 hash for simple text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'b10a8db164e0754105b7a99be72e3fe5');
  });

  test('generates MD5 hash for empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, 'd41d8cd98f00b204e9800998ecf8427e');
  });

  test('generates different hashes for different inputs', () => {
    const result1 = executeScript(scriptPath, 'test');
    const result2 = executeScript(scriptPath, 'Test');
    assertEqual(result1.result !== result2.result, true);
  });

  test('generates consistent hash for same input', () => {
    const result1 = executeScript(scriptPath, 'test');
    const result2 = executeScript(scriptPath, 'test');
    assertEqual(result1.result, result2.result);
  });
});
