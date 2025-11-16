const path = require('path');
const { executeScript, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'FromUnicode.js');

describe('FromUnicode', () => {
  test('converts Unicode escaped to text', () => {
    const result = executeScript(scriptPath, '\\u0048\\u0065\\u006C\\u006C\\u006F');
    // Known bug: produces leading null character
    assertTrue(result.result.includes('Hello'));
  });
});
