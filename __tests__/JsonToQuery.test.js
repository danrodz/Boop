const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JsonToQuery.js');

describe('JsonToQuery', () => {
  test('converts JSON to query string', () => {
    const input = '{"name": "John", "age": "30"}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'name=John');
    assertContains(result.result, 'age=30');
  });

  test('handles special characters', () => {
    const input = '{"email": "test@example.com"}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'email=');
  });

  test('joins with ampersand', () => {
    const input = '{"a": "1", "b": "2"}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '&');
  });
});
