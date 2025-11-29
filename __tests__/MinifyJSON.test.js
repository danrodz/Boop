const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MinifyJSON.js');

describe('MinifyJSON', () => {
  test('minifies formatted JSON', () => {
    const input = '{\n  "name": "John",\n  "age": 30\n}';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, '{"name":"John","age":30}');
  });

  test('minifies nested JSON', () => {
    const input = '{\n  "user": {\n    "name": "John"\n  }\n}';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, '{"user":{"name":"John"}}');
  });

  test('minifies JSON array', () => {
    const input = '[\n  "apple",\n  "banana"\n]';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, '["apple","banana"]');
  });

  test('handles already minified JSON', () => {
    const input = '{"name":"John"}';
    const result = executeScript(scriptPath, input);
    assertEqual(result.result, '{"name":"John"}');
  });
});
