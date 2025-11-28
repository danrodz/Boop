const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CapitalizeLines.js');

describe('CapitalizeLines', () => {
  test('capitalizes first letter of each line', () => {
    const result = executeScript(scriptPath, 'hello world\ntest line\nanother line');
    assertEqual(result.result, 'Hello world\nTest line\nAnother line');
  });

  test('handles already capitalized lines', () => {
    const result = executeScript(scriptPath, 'Hello\nWorld');
    assertEqual(result.result, 'Hello\nWorld');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'hello world');
    assertEqual(result.result, 'Hello world');
  });

  test('handles empty lines', () => {
    const result = executeScript(scriptPath, 'hello\n\nworld');
    assertEqual(result.result, 'Hello\n\nWorld');
  });
});
