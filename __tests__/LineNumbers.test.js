const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'LineNumbers.js');

describe('LineNumbers', () => {
  test('adds line numbers to each line', () => {
    const result = executeScript(scriptPath, 'First\nSecond\nThird');
    assertContains(result.result, '1');
    assertContains(result.result, '2');
    assertContains(result.result, '3');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertContains(result.result, '1');
    assertContains(result.result, 'Hello');
  });

  test('handles many lines', () => {
    const lines = Array.from({length: 15}, (_, i) => `Line ${i + 1}`).join('\n');
    const result = executeScript(scriptPath, lines);
    assertContains(result.result, '10');
    assertContains(result.result, '15');
  });
});
