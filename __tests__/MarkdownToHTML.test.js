const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MarkdownToHTML.js');

describe('MarkdownToHTML', () => {
  test('converts markdown headers to HTML', () => {
    const result = executeScript(scriptPath, '# Heading');
    assertContains(result.result, '<h1>');
    assertContains(result.result, 'Heading');
  });

  test('converts markdown bold to HTML', () => {
    const result = executeScript(scriptPath, '**bold**');
    assertContains(result.result, '<strong>');
    assertContains(result.result, 'bold');
  });

  test('converts markdown links to HTML', () => {
    const result = executeScript(scriptPath, '[link](http://example.com)');
    assertContains(result.result, '<a');
    assertContains(result.result, 'href');
  });
});
