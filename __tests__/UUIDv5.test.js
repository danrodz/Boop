const path = require('path');
const { executeScript, assertTrue, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'UUIDv5.js');

describe('UUIDv5', () => {
  test('generates valid UUID v5 format with default namespace', () => {
    const result = executeScript(scriptPath, 'example.com');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertTrue(uuidRegex.test(result.result), `Expected valid UUID v5 but got: ${result.result}`);
  });

  test('generates same UUID for same input (deterministic)', () => {
    const result1 = executeScript(scriptPath, 'example.com');
    const result2 = executeScript(scriptPath, 'example.com');
    assertEqual(result1.result, result2.result, 'UUID v5 should be deterministic');
  });

  test('generates different UUID for different inputs', () => {
    const result1 = executeScript(scriptPath, 'example.com');
    const result2 = executeScript(scriptPath, 'different.com');
    assertTrue(result1.result !== result2.result, 'Different names should produce different UUIDs');
  });

  test('accepts custom namespace (DNS)', () => {
    const result = executeScript(scriptPath, 'DNS|example.com');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertTrue(uuidRegex.test(result.result));
  });

  test('accepts custom namespace (URL)', () => {
    const result = executeScript(scriptPath, 'URL|https://example.com');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertTrue(uuidRegex.test(result.result));
  });

  test('accepts custom namespace (OID)', () => {
    const result = executeScript(scriptPath, 'OID|1.2.3.4');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertTrue(uuidRegex.test(result.result));
  });

  test('accepts custom namespace (X500)', () => {
    const result = executeScript(scriptPath, 'X500|cn=test');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertTrue(uuidRegex.test(result.result));
  });

  test('accepts custom UUID namespace', () => {
    const result = executeScript(scriptPath, '6ba7b810-9dad-11d1-80b4-00c04fd430c8|example.com');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertTrue(uuidRegex.test(result.result));
  });

  test('version field is correct (5)', () => {
    const result = executeScript(scriptPath, 'example.com');
    const version = result.result.charAt(14);
    assertEqual(version, '5', 'Version field should be 5');
  });

  test('variant field is correct', () => {
    const result = executeScript(scriptPath, 'example.com');
    const variant = result.result.charAt(19).toLowerCase();
    assertTrue(['8', '9', 'a', 'b'].includes(variant), `Variant should be 8, 9, a, or b but got ${variant}`);
  });

  test('handles empty input with error', () => {
    const result = executeScript(scriptPath, '');
    assertTrue(result.errors.length > 0, 'Should post error for empty input');
  });

  test('handles invalid namespace with error', () => {
    const result = executeScript(scriptPath, 'INVALID|example.com');
    assertTrue(result.errors.length > 0, 'Should post error for invalid namespace');
  });

  test('handles name with pipe character', () => {
    const result = executeScript(scriptPath, 'DNS|example.com|with|pipes');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertTrue(uuidRegex.test(result.result));
  });
});
