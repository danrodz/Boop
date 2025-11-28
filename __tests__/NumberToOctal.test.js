const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NumberToOctal.js');

describe('NumberToOctal', () => {
  test('converts number to octal', () => {
    const result = executeScript(scriptPath, '8');
    assertEqual(result.result, '10');
  });

  test('converts zero', () => {
    const result = executeScript(scriptPath, '0');
    assertEqual(result.result, '0');
  });

  test('converts small number', () => {
    const result = executeScript(scriptPath, '7');
    assertEqual(result.result, '7');
  });

  test('converts large number', () => {
    const result = executeScript(scriptPath, '64');
    assertEqual(result.result, '100');
  });
});
