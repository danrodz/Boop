const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'DecimalToHex.js');

describe('DecimalToHex', () => {
  test('converts decimal to hex', () => {
    const result = executeScript(scriptPath, '255');
    assertEqual(result.result.toLowerCase(), 'ff');
  });

  test('converts zero', () => {
    const result = executeScript(scriptPath, '0');
    assertEqual(result.result, '0');
  });

  test('converts small number', () => {
    const result = executeScript(scriptPath, '10');
    assertEqual(result.result.toLowerCase(), 'a');
  });

  test('converts large number', () => {
    const result = executeScript(scriptPath, '4095');
    assertEqual(result.result.toLowerCase(), 'fff');
  });
});
