const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'FlattenJSON.js');

describe('FlattenJSON', () => {
  test('flattens nested JSON', () => {
    const input = '{"user": {"name": "John", "age": 30}}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'user.name');
    assertContains(result.result, 'John');
  });

  test('handles deeply nested objects', () => {
    const input = '{"a": {"b": {"c": "value"}}}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'a.b.c');
  });

  test('handles already flat JSON', () => {
    const input = '{"name": "John", "age": 30}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'name');
  });
});
