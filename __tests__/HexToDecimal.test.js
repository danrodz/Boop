const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'HexToDecimal.js');

describe('HexToDecimal', () => {
  test('converts hex to decimal', () => {
    const result = executeScript(scriptPath, 'FF');
    assertEqual(result.result, '255');
  });

  test('converts lowercase hex', () => {
    const result = executeScript(scriptPath, 'ff');
    assertEqual(result.result, '255');
  });

  test('converts zero', () => {
    const result = executeScript(scriptPath, '0');
    assertEqual(result.result, '0');
  });

  test('converts single digit hex', () => {
    const result = executeScript(scriptPath, 'A');
    assertEqual(result.result, '10');
  });
});
