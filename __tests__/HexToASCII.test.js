const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'HexToASCII.js');

describe('HexToASCII', () => {
  test('converts hex to ASCII', () => {
    const result = executeScript(scriptPath, '48656c6c6f');
    assertEqual(result.result, 'Hello');
  });

  test('handles uppercase hex', () => {
    const result = executeScript(scriptPath, '48656C6C6F');
    assertEqual(result.result, 'Hello');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('converts hex with spaces', () => {
    const result = executeScript(scriptPath, '48 65 6c 6c 6f');
    assertEqual(result.result, 'Hello');
  });
});
