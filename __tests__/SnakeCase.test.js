const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'SnakeCase.js');

describe('SnakeCase', () => {
  test('converts camelCase to snake_case', () => {
    const result = executeScript(scriptPath, 'helloWorldTest');
    assertEqual(result.result, 'hello_world_test');
  });

  test('converts kebab-case to snake_case', () => {
    const result = executeScript(scriptPath, 'hello-world-test');
    assertEqual(result.result, 'hello_world_test');
  });

  test('converts space-separated to snake_case', () => {
    const result = executeScript(scriptPath, 'hello world test');
    assertEqual(result.result, 'hello_world_test');
  });

  test('handles already snake_case', () => {
    const result = executeScript(scriptPath, 'hello_world');
    assertEqual(result.result, 'hello_world');
  });

  test('handles single word', () => {
    const result = executeScript(scriptPath, 'hello');
    assertEqual(result.result, 'hello');
  });
});
