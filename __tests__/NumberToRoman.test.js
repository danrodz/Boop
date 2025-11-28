const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NumberToRoman.js');

describe('NumberToRoman', () => {
  test('converts single digit to roman', () => {
    const result = executeScript(scriptPath, '5');
    assertEqual(result.result, 'V');
  });

  test('converts 10 to roman', () => {
    const result = executeScript(scriptPath, '10');
    assertEqual(result.result, 'X');
  });

  test('converts complex number to roman', () => {
    const result = executeScript(scriptPath, '1994');
    assertEqual(result.result, 'MCMXCIV');
  });

  test('converts 2024 to roman', () => {
    const result = executeScript(scriptPath, '2024');
    assertEqual(result.result, 'MMXXIV');
  });
});
