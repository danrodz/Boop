const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'DecimalToBinary.js');

describe('DecimalToBinary', () => {
  test('converts decimal to binary', () => {
    const result = executeScript(scriptPath, '10');
    assertEqual(result.result, '1010');
  });

  test('converts zero', () => {
    const result = executeScript(scriptPath, '0');
    assertEqual(result.result, '0');
  });

  test('converts one', () => {
    const result = executeScript(scriptPath, '1');
    assertEqual(result.result, '1');
  });

  test('converts large number', () => {
    const result = executeScript(scriptPath, '255');
    assertEqual(result.result, '11111111');
  });
});
