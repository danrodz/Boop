const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ConvertToMarkdownTable.js');

describe('ConvertToMarkdownTable', () => {
  test('converts CSV to markdown table', () => {
    const result = executeScript(scriptPath, 'Name,Age\nAlice,30\nBob,25');
    assertContains(result.result, '|');
    assertContains(result.result, '---');
  });
});
