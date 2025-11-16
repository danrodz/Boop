const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CRC32.js');

describe('CRC32', () => {
  test('calculates checksum for "Hello World"', () => {
    const result = executeScript(scriptPath, 'Hello World');
    // CRC32 of "Hello World" is 0x4A17B156
    assertEqual(result.result, '4A17B156');
  });

  test('calculates checksum for empty string', () => {
    const result = executeScript(scriptPath, '');
    // CRC32 of empty string is 0x00000000
    assertEqual(result.result, '00000000');
  });

  test('calculates checksum for "123456789"', () => {
    const result = executeScript(scriptPath, '123456789');
    // Standard CRC32 test vector: CRC32("123456789") = 0xCBF43926
    assertEqual(result.result, 'CBF43926');
  });

  test('handles special characters', () => {
    const result = executeScript(scriptPath, 'The quick brown fox jumps over the lazy dog');
    assertTrue(result.success);
    assertEqual(result.result.length, 8); // Should be 8 hex chars
  });
});
