const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'TransposeLines.js');

describe('TransposeLines', () => {
  test('transposes space-separated data', () => {
    const input = 'a b c\nd e f\ng h i';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'a\td\tg\nb\te\th\nc\tf\ti');
  });

  test('transposes tab-separated data', () => {
    const input = 'a\tb\tc\nd\te\tf';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, 'a\td\nb\te\nc\tf');
  });

  test('handles 2x2 matrix', () => {
    const input = '1 2\n3 4';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, '1\t3\n2\t4');
  });

  test('handles uneven rows', () => {
    const input = 'a b c\nd e';
    const result = executeScript(scriptPath, input);
    // Should pad with empty strings
    const lines = result.result.split('\n');
    assertEqual(lines.length, 3); // 3 columns
  });
});
