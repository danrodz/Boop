const path = require('path');
const { executeScript, assertTrue, assertEqual, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CalculateSize.js');

describe('CalculateSize', () => {
  test('calculates bytes for short text', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertTrue(result.success);
    assertEqual(result.infos.length, 1);
    assertContains(result.infos[0], 'bytes');
    assertContains(result.infos[0], '5'); // "Hello" is 5 bytes in UTF-8
  });

  test('handles UTF-8 multibyte characters', () => {
    const result = executeScript(scriptPath, '你好'); // 2 Chinese characters, 3 bytes each = 6 bytes
    assertTrue(result.success);
    assertEqual(result.infos.length, 1);
    assertContains(result.infos[0], 'bytes');
    assertContains(result.infos[0], '6');
  });
});
