const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'SumNumbers.js');

describe('SumNumbers', () => {
  test('sums positive integers', () => {
    const result = executeScript(scriptPath, '1 2 3 4 5');
    assertEqual(result.result, '15');
  });

  test('sums decimal numbers', () => {
    const result = executeScript(scriptPath, '1.5 2.5 3.0');
    assertEqual(result.result, '7');
  });

  test('sums negative numbers', () => {
    const result = executeScript(scriptPath, '-5 10 -3');
    assertEqual(result.result, '2');
  });

  test('sums numbers from text', () => {
    const result = executeScript(scriptPath, 'Total: 100, Tax: 15, Shipping: 5');
    assertEqual(result.result, '120');
  });

  test('handles single number', () => {
    const result = executeScript(scriptPath, '42');
    assertEqual(result.result, '42');
  });

  test('handles no numbers with error', () => {
    const result = executeScript(scriptPath, 'no numbers here');
    assertTrue(result.errors.length > 0);
  });
});
