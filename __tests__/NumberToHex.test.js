const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NumberToHex.js');

describe('NumberToHex', () => {
  test('converts number to hex', () => {
    const result = executeScript(scriptPath, '255');
    assertEqual(result.result.toLowerCase(), 'ff');
  });

  test('converts zero', () => {
    const result = executeScript(scriptPath, '0');
    assertEqual(result.result, '0');
  });

  test('converts small number', () => {
    const result = executeScript(scriptPath, '15');
    assertEqual(result.result.toLowerCase(), 'f');
  });

  test('converts large number', () => {
    const result = executeScript(scriptPath, '65535');
    assertEqual(result.result.toLowerCase(), 'ffff');
  });
});
