const path = require('path');
const { executeScript, assertTrue, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'HMACSHA256.js');

describe('HMACSHA256', () => {
  test('generates HMAC with default key', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertTrue(result.success);
    assertEqual(result.result.length, 64); // SHA256 produces 64 hex chars
    assertTrue(/^[0-9A-F]+$/.test(result.result)); // Should be uppercase hex
  });

  test('generates HMAC with custom key', () => {
    const result = executeScript(scriptPath, 'secret|message');
    assertTrue(result.success);
    assertEqual(result.result.length, 64);
  });

  test('test vector from RFC 4231', () => {
    // Test case 2 from RFC 4231
    const key = 'Jefe';
    const message = 'what do ya want for nothing?';
    const result = executeScript(scriptPath, key + '|' + message);
    // Expected: 5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843
    assertEqual(result.result, '5BDCC146BF60754E6A042426089575C75A003F089D2739839DEC58B964EC3843');
  });

  test('handles empty message', () => {
    const result = executeScript(scriptPath, 'key|');
    assertTrue(result.success);
    assertEqual(result.result.length, 64);
  });

  test('handles message with pipe character', () => {
    const result = executeScript(scriptPath, 'key|message|with|pipes');
    assertTrue(result.success);
    assertEqual(result.result.length, 64);
  });

  test('different keys produce different results', () => {
    const result1 = executeScript(scriptPath, 'key1|same message');
    const result2 = executeScript(scriptPath, 'key2|same message');
    assertTrue(result1.result !== result2.result);
  });
});
