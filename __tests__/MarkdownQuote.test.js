const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MarkdownQuote.js');

describe('MarkdownQuote', () => {
  test('adds markdown quote prefix', () => {
    const result = executeScript(scriptPath, 'This is a quote');
    assertContains(result.result, '> This is a quote');
  });

  test('quotes multiple lines', () => {
    const result = executeScript(scriptPath, 'Line 1\nLine 2');
    assertContains(result.result, '> Line 1');
    assertContains(result.result, '> Line 2');
  });

  test('handles single line', () => {
    const result = executeScript(scriptPath, 'Quote');
    assertContains(result.result, '> Quote');
  });
});
