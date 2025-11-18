const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'AlignToColumns.js');

describe('AlignToColumns', () => {
  test('aligns text to columns', () => {
    const input = 'a b c\ndd ee ff\nggg hhh iii';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'a');
    assertContains(result.result, 'b');
  });

  test('handles different column widths', () => {
    const input = 'short longer\nx y';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'short');
  });

  test('preserves column structure', () => {
    const input = 'col1 col2 col3\ndata1 data2 data3';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'col1');
  });
});
