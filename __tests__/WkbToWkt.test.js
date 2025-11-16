const path = require('path');
const { executeScript, assertTrue, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'WkbToWkt.js');

describe('WkbToWkt', () => {
  test('converts WKB hex to POINT', () => {
    // WKB for POINT(1.5 2.5) in little-endian format (complete 42-char hex)
    // Byte order (1 byte) + Type (4 bytes) + X coord (8 bytes) + Y coord (8 bytes)
    const wkb = '0101000000000000000000f83f0000000000000440';
    const result = executeScript(scriptPath, wkb);
    assertTrue(result.success);
    assertContains(result.result, 'POINT');
  });

  test('handles multiple geometry types', () => {
    // Test LINESTRING - WKB type 2 in little-endian with 2 points
    // Format: 01 (LE) + 02000000 (type 2) + 02000000 (2 points) + coordinates
    const wkb = '010200000002000000000000000000000000000000000000003ff00000000000003ff0000000000000';
    const result = executeScript(scriptPath, wkb);
    assertTrue(result.success);
    assertContains(result.result, 'LINESTRING');
  });
});
