const path = require('path');
const { executeScript, assertTrue, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'HMACSHA512.js');

describe('HMACSHA512', () => {
  test('generates HMAC with default key', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertTrue(result.success);
    assertEqual(result.result.length, 128); // SHA512 produces 128 hex chars
    assertTrue(/^[0-9A-F]+$/.test(result.result)); // Should be uppercase hex
  });

  test('generates HMAC with custom key', () => {
    const result = executeScript(scriptPath, 'secret|message');
    assertTrue(result.success);
    assertEqual(result.result.length, 128);
  });

  test('handles empty message', () => {
    const result = executeScript(scriptPath, 'key|');
    assertTrue(result.success);
    assertEqual(result.result.length, 128);
  });

  test('handles long message', () => {
    const longMessage = 'a'.repeat(1000);
    const result = executeScript(scriptPath, 'key|' + longMessage);
    assertTrue(result.success);
    assertEqual(result.result.length, 128);
  });

  test('different keys produce different results', () => {
    const result1 = executeScript(scriptPath, 'key1|same message');
    const result2 = executeScript(scriptPath, 'key2|same message');
    assertTrue(result1.result !== result2.result);
  });

  test('handles UTF-8 characters', () => {
    const result = executeScript(scriptPath, 'key|Hello 世界');
    assertTrue(result.success);
    assertEqual(result.result.length, 128);
  });
});
