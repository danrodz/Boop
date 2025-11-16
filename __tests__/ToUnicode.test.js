const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ToUnicode.js');

describe('ToUnicode', () => {
  test('converts text to Unicode escaped format', () => {
    const result = executeScript(scriptPath, 'Hi');
    assertContains(result.result, '\\u0048'); // H
    assertContains(result.result, '\\u0069'); // i
  });
});
