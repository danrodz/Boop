const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'DuplicateAndIncrement.js');

describe('DuplicateAndIncrement', () => {
  test('duplicates lines and increments numbers', () => {
    const result = executeScript(scriptPath, 'item 1\nitem 2');
    assertContains(result.result, 'item 1');
    assertContains(result.result, 'item 2');
  });

  test('increments numbers in duplicated lines', () => {
    const result = executeScript(scriptPath, 'test 5');
    assertContains(result.result, '5');
    assertContains(result.result, '6');
  });

  test('handles multiple numbers per line', () => {
    const result = executeScript(scriptPath, 'row 1 col 1');
    assertContains(result.result, 'row');
  });
});
