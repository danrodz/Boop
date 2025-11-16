const path = require('path');
const { executeScript, assertTrue, assertEqual, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'TextStatistics.js');

describe('TextStatistics', () => {
  test('calculates basic statistics', () => {
    const result = executeScript(scriptPath, 'Hello world');
    assertTrue(result.infos.length > 0);
    assertContains(result.infos[0], 'Characters: 11');
    assertContains(result.infos[0], 'Words: 2');
    assertEqual(result.result, 'Hello world'); // Text unchanged
  });

  test('counts characters with and without spaces', () => {
    const result = executeScript(scriptPath, 'Hello world');
    assertContains(result.infos[0], '11');
    assertContains(result.infos[0], '10 without spaces');
  });

  test('counts lines correctly', () => {
    const result = executeScript(scriptPath, 'Line 1\nLine 2\nLine 3');
    assertContains(result.infos[0], 'Lines: 3');
  });

  test('counts non-empty lines', () => {
    const result = executeScript(scriptPath, 'Line 1\n\nLine 2\n\nLine 3');
    assertContains(result.infos[0], '3 non-empty');
  });

  test('counts sentences', () => {
    const result = executeScript(scriptPath, 'First sentence. Second sentence! Third sentence?');
    assertContains(result.infos[0], 'Sentences: 3');
  });

  test('counts paragraphs', () => {
    const result = executeScript(scriptPath, 'Para 1\nLine 2\n\nPara 2\nLine 2');
    assertContains(result.infos[0], 'Paragraphs: 2');
  });

  test('calculates average word length', () => {
    const result = executeScript(scriptPath, 'I am testing');
    assertContains(result.infos[0], 'Average word length:');
  });

  test('calculates reading time', () => {
    const result = executeScript(scriptPath, 'word '.repeat(100));
    assertContains(result.infos[0], 'reading time:');
  });

  test('shows reading time in seconds for short text', () => {
    const result = executeScript(scriptPath, 'Short text here');
    assertContains(result.infos[0], 'sec');
  });

  test('shows reading time in minutes for long text', () => {
    const result = executeScript(scriptPath, 'word '.repeat(300));
    assertContains(result.infos[0], 'min');
  });

  test('handles empty text', () => {
    const result = executeScript(scriptPath, '');
    assertTrue(result.errors.length > 0);
    assertContains(result.errors[0], 'Empty');
  });

  test('handles whitespace-only text', () => {
    const result = executeScript(scriptPath, '   \n   \n   ');
    assertTrue(result.errors.length > 0);
    assertContains(result.errors[0], 'Empty');
  });

  test('preserves original text', () => {
    const input = 'This is a test. Do not change this text!';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, input);
  });

  test('handles complex text', () => {
    const complexText = 'This is the first paragraph.\nIt has multiple sentences!\n\nThis is the second paragraph?\nIt also has sentences.';
    const result = executeScript(scriptPath, complexText);
    assertTrue(result.infos.length > 0);
    assertContains(result.infos[0], 'Characters:');
    assertContains(result.infos[0], 'Words:');
    assertContains(result.infos[0], 'Lines:');
    assertContains(result.infos[0], 'Sentences:');
    assertContains(result.infos[0], 'Paragraphs: 2');
  });
});
