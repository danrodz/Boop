const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'TrimEnd.js');

describe('TrimEnd', () => {
  test('trims trailing whitespace', () => {
    const result = executeScript(scriptPath, '   Hello World   ');
    assertEqual(result.result, '   Hello World');
  });
});
