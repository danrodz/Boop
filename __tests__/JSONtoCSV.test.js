const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JSONtoCSV.js');

describe('JSONtoCSV', () => {
  test('converts JSON array to CSV', () => {
    const input = '[{"name":"John","age":30},{"name":"Jane","age":25}]';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'name,age');
    assertContains(result.result, 'John,30');
    assertContains(result.result, 'Jane,25');
  });

  test('handles single object', () => {
    const input = '[{"name":"John","age":30}]';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'name,age');
    assertContains(result.result, 'John,30');
  });

  test('handles empty array', () => {
    const input = '[]';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, '');
  });
});
