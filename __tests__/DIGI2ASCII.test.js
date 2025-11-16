const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'DIGI2ASCII.js');

describe('DIGI2ASCII', () => {
  test('converts decimal codes to ASCII (space-separated)', () => {
    const result = executeScript(scriptPath, '72 101 108 108 111');
    assertEqual(result.result, 'Hello');
  });

  test('converts decimal codes to ASCII (comma-separated)', () => {
    const result = executeScript(scriptPath, '72,101,108,108,111');
    assertEqual(result.result, 'Hello');
  });
});
