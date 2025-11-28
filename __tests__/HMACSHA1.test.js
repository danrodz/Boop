const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'HMACSHA1.js');

describe('HMACSHA1', () => {
  test('generates HMAC-SHA1 with key', () => {
    const input = 'message\nkey';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result.length, 40); // SHA1 HMAC produces 40 hex characters
  });

  test('generates consistent HMAC for same input and key', () => {
    const input = 'message\nkey';
    const result1 = executeScript(scriptPath, input);
    const result2 = executeScript(scriptPath, input);
    assertEqual(result1.result, result2.result);
  });

  test('generates different HMAC for different keys', () => {
    const input1 = 'message\nkey1';
    const input2 = 'message\nkey2';
    const result1 = executeScript(scriptPath, input1);
    const result2 = executeScript(scriptPath, input2);
    assertEqual(result1.result !== result2.result, true);
  });
});
