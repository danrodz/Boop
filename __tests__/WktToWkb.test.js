const path = require('path');
const { executeScript, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'WktToWkb.js');

describe('WktToWkb', () => {
  test('converts POINT to WKB hex', () => {
    const result = executeScript(scriptPath, 'POINT(0 0)');
    assertTrue(result.success);
    // Should be hex string
    assertTrue(result.result.length > 20);
    assertTrue(/^[0-9a-f]+$/i.test(result.result));
  });

  test('converts LINESTRING to WKB hex', () => {
    const result = executeScript(scriptPath, 'LINESTRING(0 0, 1 1)');
    assertTrue(result.success);
    assertTrue(result.result.length > 20);
  });
});
