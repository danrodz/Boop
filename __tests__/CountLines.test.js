const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CountLines.js');

describe('CountLines', () => {
  test('counts multiple lines', () => {
    const result = executeScript(scriptPath, 'Line1\nLine2\nLine3');
    assertContains(result.result, '3');
  });

  test('counts single line', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertContains(result.result, '1');
  });

  test('counts empty lines', () => {
    const result = executeScript(scriptPath, 'A\n\nB\n\nC');
    assertContains(result.result, '5');
  });

  test('counts many lines', () => {
    const lines = Array.from({length: 100}, (_, i) => `Line ${i}`).join('\n');
    const result = executeScript(scriptPath, lines);
    assertContains(result.result, '100');
  });
});
