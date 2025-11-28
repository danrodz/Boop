const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'PhpUnserialize.js');

describe('PhpUnserialize', () => {
  test('unserializes PHP string', () => {
    const result = executeScript(scriptPath, 's:5:"hello";');
    assertContains(result.result, 'hello');
  });

  test('unserializes PHP array', () => {
    const result = executeScript(scriptPath, 'a:2:{i:0;s:1:"a";i:1;s:1:"b";}');
    assertContains(result.result, 'a');
    assertContains(result.result, 'b');
  });

  test('handles PHP numbers', () => {
    const result = executeScript(scriptPath, 'i:42;');
    assertContains(result.result, '42');
  });
});
