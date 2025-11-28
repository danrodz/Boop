const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NatSort.js');

describe('NatSort', () => {
  test('sorts numbers naturally', () => {
    const result = executeScript(scriptPath, 'item10\nitem2\nitem1\nitem20');
    assertEqual(result.result, 'item1\nitem2\nitem10\nitem20');
  });

  test('sorts version numbers', () => {
    const result = executeScript(scriptPath, 'v1.10\nv1.2\nv1.1\nv1.20');
    assertEqual(result.result, 'v1.1\nv1.2\nv1.10\nv1.20');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'item1');
    assertEqual(result.result, 'item1');
  });

  test('handles mixed alphanumeric', () => {
    const result = executeScript(scriptPath, 'file100.txt\nfile2.txt\nfile10.txt');
    assertEqual(result.result, 'file2.txt\nfile10.txt\nfile100.txt');
  });
});
