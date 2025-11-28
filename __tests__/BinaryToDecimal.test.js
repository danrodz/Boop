const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'BinaryToDecimal.js');

describe('BinaryToDecimal', () => {
  test('converts binary to decimal', () => {
    const result = executeScript(scriptPath, '1010');
    assertEqual(result.result, '10');
  });

  test('converts zero', () => {
    const result = executeScript(scriptPath, '0');
    assertEqual(result.result, '0');
  });

  test('converts one', () => {
    const result = executeScript(scriptPath, '1');
    assertEqual(result.result, '1');
  });

  test('converts large binary', () => {
    const result = executeScript(scriptPath, '11111111');
    assertEqual(result.result, '255');
  });
});
