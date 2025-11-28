const path = require('path');
const { executeScript, assertEqual, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'FormatJSON.js');

describe('FormatJSON', () => {
  test('formats minified JSON', () => {
    const input = '{"name":"John","age":30}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '  "name": "John"');
    assertContains(result.result, '  "age": 30');
  });

  test('formats nested JSON', () => {
    const input = '{"user":{"name":"John","age":30}}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '  "user": {');
    assertContains(result.result, '    "name": "John"');
  });

  test('formats JSON array', () => {
    const input = '["apple","banana","cherry"]';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '  "apple"');
    assertContains(result.result, '  "banana"');
  });

  test('handles already formatted JSON', () => {
    const input = '{\n  "name": "John"\n}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '"name": "John"');
  });
});
