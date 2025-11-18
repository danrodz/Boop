const path = require('path');
const { executeScript, assertEqual, assertTrue, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const grepPath = path.join(scriptsDir, 'GrepLines.js');
const invertedGrepPath = path.join(scriptsDir, 'InvertedGrep.js');

describe('GrepLines', () => {
  test('filters lines by simple pattern', () => {
    const input = 'test\napple\nbanana\ntestcase\ngrape';
    const result = executeScript(grepPath, input);
    assertEqual(result.result, 'testcase');
  });

  test('filters lines by regex pattern', () => {
    const input = '\\d+\ntest123\nhello\nworld456\nfoo';
    const result = executeScript(grepPath, input);
    assertEqual(result.result, 'test123\nworld456');
  });

  test('handles no matches', () => {
    const input = 'xyz\napple\nbanana\ngrape';
    const result = executeScript(grepPath, input);
    assertEqual(result.result, '');
  });

  test('handles invalid regex with error', () => {
    const input = '[unclosed\napple\nbanana';
    const result = executeScript(grepPath, input);
    assertTrue(result.success); // Script runs but posts error
    assertTrue(result.errors.length > 0);
    assertContains(result.errors[0], 'Invalid regex pattern');
  });

  test('requires at least 2 lines', () => {
    const result = executeScript(grepPath, 'pattern only');
    assertTrue(result.success); // Script runs but posts error
    assertTrue(result.errors.length > 0);
    assertContains(result.errors[0], 'at least 2 lines');
  });
});

describe('InvertedGrep', () => {
  test('excludes lines matching pattern', () => {
    const input = 'test\napple\nbanana\ntestcase\ngrape';
    const result = executeScript(invertedGrepPath, input);
    assertEqual(result.result, 'apple\nbanana\ngrape');
  });

  test('excludes lines by regex pattern', () => {
    const input = '\\d+\ntest123\nhello\nworld456\nfoo';
    const result = executeScript(invertedGrepPath, input);
    assertEqual(result.result, 'hello\nfoo');
  });

  test('handles all lines matching', () => {
    const input = 'test\ntesting\ntest123\ntester';
    const result = executeScript(invertedGrepPath, input);
    assertEqual(result.result, '');
  });

  test('handles invalid regex with error', () => {
    const input = '[unclosed\napple\nbanana';
    const result = executeScript(invertedGrepPath, input);
    assertTrue(result.success); // Script runs but posts error
    assertTrue(result.errors.length > 0);
    assertContains(result.errors[0], 'Invalid regex pattern');
  });
});
