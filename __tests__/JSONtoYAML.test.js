const path = require('path');
const { executeScript, assertEqual, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JSONtoYAML.js');

describe('JSONtoYAML', () => {
  test('converts simple JSON object to YAML', () => {
    const input = '{"name": "John", "age": 30}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'name: John');
    assertContains(result.result, 'age: 30');
  });

  test('converts JSON array to YAML', () => {
    const input = '["apple", "banana", "cherry"]';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '- apple');
    assertContains(result.result, '- banana');
  });

  test('converts nested JSON to YAML', () => {
    const input = '{"user": {"name": "John", "age": 30}}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'user:');
    assertContains(result.result, 'name: John');
  });

  test('handles boolean values', () => {
    const input = '{"active": true, "disabled": false}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'active: true');
    assertContains(result.result, 'disabled: false');
  });
});
