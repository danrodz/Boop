const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CSVtoJSON.js');

describe('CSVtoJSON', () => {
  test('converts CSV to JSON', () => {
    const input = 'name,age\nJohn,30\nJane,25';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'John');
    assertContains(result.result, '30');
  });

  test('handles CSV with headers', () => {
    const input = 'id,value\n1,test\n2,demo';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'id');
    assertContains(result.result, 'value');
  });

  test('creates JSON array', () => {
    const input = 'a,b\n1,2';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '[');
    assertContains(result.result, ']');
  });
});
