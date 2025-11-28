const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NumberToBinary.js');

describe('NumberToBinary', () => {
  test('converts number to binary', () => {
    const result = executeScript(scriptPath, '42');
    assertEqual(result.result, '101010');
  });

  test('converts zero', () => {
    const result = executeScript(scriptPath, '0');
    assertEqual(result.result, '0');
  });

  test('converts power of two', () => {
    const result = executeScript(scriptPath, '16');
    assertEqual(result.result, '10000');
  });

  test('converts large number', () => {
    const result = executeScript(scriptPath, '1024');
    assertEqual(result.result, '10000000000');
  });
});
