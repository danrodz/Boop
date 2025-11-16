const path = require('path');
const { executeScript, assertTrue, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'tsvToJson.js');

describe('tsvToJson', () => {
  test('converts TSV with headers to JSON', () => {
    const result = executeScript(scriptPath, 'Name\tAge\tCity\nAlice\t30\tNYC\nBob\t25\tLA');
    assertTrue(result.success);
    assertContains(result.result, 'Alice');
    assertContains(result.result, 'NYC');
    // Should be valid JSON array
    assertTrue(result.result.startsWith('['));
  });

  test('handles single data row', () => {
    const result = executeScript(scriptPath, 'Header1\tHeader2\nValue1\tValue2');
    assertTrue(result.success);
    assertContains(result.result, 'Value1');
    assertContains(result.result, 'Value2');
  });
});
