const path = require('path');
const { executeScript, assertTrue, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'UUIDv4.js');

describe('UUIDv4', () => {
  test('generates valid UUID v4 format', () => {
    const result = executeScript(scriptPath, '');
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    assertTrue(uuidRegex.test(result.result), `Expected valid UUID v4 but got: ${result.result}`);
  });

  test('generates different UUIDs on multiple runs', () => {
    const result1 = executeScript(scriptPath, '');
    const result2 = executeScript(scriptPath, '');
    assertTrue(result1.result !== result2.result, 'UUIDs should be different');
  });

  test('version field is correct (4)', () => {
    const result = executeScript(scriptPath, '');
    const version = result.result.charAt(14);
    assertEqual(version, '4', 'Version field should be 4');
  });

  test('variant field is correct', () => {
    const result = executeScript(scriptPath, '');
    const variant = result.result.charAt(19).toLowerCase();
    assertTrue(['8', '9', 'a', 'b'].includes(variant), `Variant should be 8, 9, a, or b but got ${variant}`);
  });
});
