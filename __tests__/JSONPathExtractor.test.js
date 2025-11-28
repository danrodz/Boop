const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JSONPathExtractor.js');

describe('JSONPathExtractor', () => {
  test('extracts value from JSON path', () => {
    const input = '{"user": {"name": "John"}}\nuser.name';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'John');
  });

  test('handles nested paths', () => {
    const input = '{"a": {"b": {"c": "value"}}}\na.b.c';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'value');
  });

  test('handles array indices', () => {
    const input = '{"items": ["first", "second"]}\nitems[0]';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'first');
  });
});
