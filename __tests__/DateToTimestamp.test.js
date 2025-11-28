const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'DateToTimestamp.js');

describe('DateToTimestamp', () => {
  test('converts date to timestamp', () => {
    const result = executeScript(scriptPath, '2024-01-01T00:00:00Z');
    assertContains(result.result, '1704067200');
  });

  test('handles ISO date format', () => {
    const result = executeScript(scriptPath, '2023-01-01T00:00:00.000Z');
    assertEqual(result.result.length > 0, true);
  });

  test('converts to unix timestamp', () => {
    const result = executeScript(scriptPath, '1970-01-01T00:00:00Z');
    assertContains(result.result, '0');
  });
});
