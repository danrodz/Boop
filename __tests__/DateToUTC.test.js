const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'DateToUTC.js');

describe('DateToUTC', () => {
  test('converts date to UTC', () => {
    const result = executeScript(scriptPath, '2024-01-01T12:00:00');
    assertContains(result.result, '2024');
  });

  test('handles ISO format', () => {
    const result = executeScript(scriptPath, '2023-12-31T23:59:59');
    assertEqual(result.result.length > 0, true);
  });

  test('outputs UTC time', () => {
    const result = executeScript(scriptPath, '2024-01-01T00:00:00Z');
    assertContains(result.result, 'UTC' || result.result.includes('Z'));
  });
});
