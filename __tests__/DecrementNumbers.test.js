const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'DecrementNumbers.js');

describe('DecrementNumbers', () => {
  test('decrements all numbers by 1', () => {
    const result = executeScript(scriptPath, '5 10 15');
    assertContains(result.result, '4');
    assertContains(result.result, '9');
    assertContains(result.result, '14');
  });

  test('handles single number', () => {
    const result = executeScript(scriptPath, '100');
    assertContains(result.result, '99');
  });

  test('handles numbers in text', () => {
    const result = executeScript(scriptPath, 'Item 5 and Item 10');
    assertContains(result.result, '4');
    assertContains(result.result, '9');
  });

  test('handles zero', () => {
    const result = executeScript(scriptPath, '0');
    assertContains(result.result, '-1');
  });
});
