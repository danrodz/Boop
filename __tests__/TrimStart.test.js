const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'TrimStart.js');

describe('TrimStart', () => {
  test('trims leading whitespace', () => {
    const result = executeScript(scriptPath, '   Hello World   ');
    assertEqual(result.result, 'Hello World   ');
  });

  test('handles already trimmed text', () => {
    const result = executeScript(scriptPath, 'No leading space');
    assertEqual(result.result, 'No leading space');
  });
});
