const path = require('path');
const { executeScript, assertTrue, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JWTEncode.js');

describe('JWTEncode', () => {
  test('creates valid JWT with default secret', () => {
    const result = executeScript(scriptPath, '{"sub":"1234567890","name":"John Doe"}');
    assertTrue(result.success);
    // JWT should have 3 parts separated by dots
    const parts = result.result.split('.');
    assertEqual(parts.length, 3);
    // Check that parts are non-empty
    assertTrue(parts[0].length > 0);
    assertTrue(parts[1].length > 0);
    assertTrue(parts[2].length > 0);
  });

  test('creates JWT with custom secret', () => {
    const result = executeScript(scriptPath, 'my-secret|{"sub":"test","name":"Alice"}');
    assertTrue(result.success);
    const parts = result.result.split('.');
    assertEqual(parts.length, 3);
  });

  test('handles empty payload object', () => {
    const result = executeScript(scriptPath, '{}');
    assertTrue(result.success);
    const parts = result.result.split('.');
    assertEqual(parts.length, 3);
  });

  test('rejects invalid JSON', () => {
    const result = executeScript(scriptPath, 'not valid json');
    assertTrue(result.errors.length > 0);
  });

  test('handles complex payload', () => {
    const payload = '{"sub":"1234","name":"Test User","admin":true,"iat":1516239022}';
    const result = executeScript(scriptPath, payload);
    assertTrue(result.success);
    const parts = result.result.split('.');
    assertEqual(parts.length, 3);
  });
});
