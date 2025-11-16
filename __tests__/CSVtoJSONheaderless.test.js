const path = require('path');
const { executeScript, assertTrue, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CSVtoJSONheaderless.js');

describe('CSVtoJSONheaderless', () => {
  test('converts CSV to JSON array', () => {
    const result = executeScript(scriptPath, 'Alice,30,Engineer\nBob,25,Designer');
    assertTrue(result.success);
    assertContains(result.result, 'Alice');
    assertContains(result.result, '[');
  });
});
