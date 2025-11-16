const path = require('path');
const { executeScript, assertEqual, assertTrue, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'LineDedupKeepLast.js');

describe('LineDedupKeepLast', () => {
  test('removes duplicates keeping last occurrence', () => {
    const result = executeScript(scriptPath, 'apple\nbanana\napple\ncherry\nbanana');
    assertEqual(result.result, 'apple\ncherry\nbanana');
    assertTrue(result.infos.length > 0);
    assertContains(result.infos[0], '2 duplicate lines');
  });

  test('preserves order of last occurrences', () => {
    const result = executeScript(scriptPath, 'first\nsecond\nthird\nfirst\nsecond');
    assertEqual(result.result, 'third\nfirst\nsecond');
  });

  test('handles empty lines', () => {
    const result = executeScript(scriptPath, 'line1\n\nline2\n\nline3');
    assertEqual(result.result, 'line1\nline2\n\nline3');
  });

  test('handles multiple duplicates of same line', () => {
    const result = executeScript(scriptPath, 'test\ntest\ntest\ntest');
    assertEqual(result.result, 'test');
    assertContains(result.infos[0], '3 duplicate lines');
  });

  test('handles no duplicates', () => {
    const result = executeScript(scriptPath, 'unique1\nunique2\nunique3');
    assertEqual(result.result, 'unique1\nunique2\nunique3');
    assertContains(result.infos[0], 'No duplicate lines');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'single');
    assertEqual(result.result, 'single');
    assertContains(result.infos[0], 'No duplicate lines');
  });
});
