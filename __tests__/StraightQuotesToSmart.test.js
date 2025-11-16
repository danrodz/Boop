const path = require('path');
const { executeScript, assertTrue, assertEqual, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'StraightQuotesToSmart.js');

describe('StraightQuotesToSmart', () => {
  test('converts straight double quotes', () => {
    const result = executeScript(scriptPath, '"Hello World"');
    assertTrue(result.result.includes('\u201C'));
    assertTrue(result.result.includes('\u201D'));
    assertContains(result.infos[0], 'Converted');
  });

  test('converts straight single quotes', () => {
    const result = executeScript(scriptPath, "'Hello World'");
    assertTrue(result.result.includes('\u2018') || result.result.includes('\u2019'));
    assertContains(result.infos[0], 'Converted');
  });

  test('handles contractions', () => {
    const result = executeScript(scriptPath, "don't can't won't");
    assertTrue(result.result.includes('\u2019')); // Should use right single quote for apostrophes
    assertContains(result.result, 'don\u2019t');
  });

  test('converts nested quotes', () => {
    const result = executeScript(scriptPath, '"He said \'hello\'"');
    assertTrue(result.result.includes('\u201C'));
    assertTrue(result.result.includes('\u2018') || result.result.includes('\u2019'));
  });

  test('handles text without quotes', () => {
    const result = executeScript(scriptPath, 'No quotes here');
    assertEqual(result.result, 'No quotes here');
    assertContains(result.infos[0], 'No straight quotes found');
  });

  test('handles multiple quoted phrases', () => {
    const result = executeScript(scriptPath, '"First" and "Second"');
    const matches = (result.result.match(/\u201C/g) || []).length;
    assertEqual(matches, 2); // Two opening quotes
  });
});
