const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'GenerateTOC.js');

describe('GenerateTOC', () => {
  test('generates table of contents from markdown', () => {
    const input = '# Heading 1\n## Heading 2\n### Heading 3';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'Heading 1');
    assertContains(result.result, 'Heading 2');
  });

  test('creates links for headings', () => {
    const input = '# Introduction\n## Setup';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'Introduction');
    assertContains(result.result, 'Setup');
  });

  test('handles nested headings', () => {
    const input = '# Main\n## Sub\n### SubSub';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'Main');
  });
});
