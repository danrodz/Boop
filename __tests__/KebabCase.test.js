const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'KebabCase.js');

describe('KebabCase', () => {
  test('converts camelCase to kebab-case', () => {
    const result = executeScript(scriptPath, 'helloWorldTest');
    assertEqual(result.result, 'hello-world-test');
  });

  test('converts snake_case to kebab-case', () => {
    const result = executeScript(scriptPath, 'hello_world_test');
    assertEqual(result.result, 'hello-world-test');
  });

  test('converts space-separated to kebab-case', () => {
    const result = executeScript(scriptPath, 'hello world test');
    assertEqual(result.result, 'hello-world-test');
  });

  test('handles already kebab-case', () => {
    const result = executeScript(scriptPath, 'hello-world');
    assertEqual(result.result, 'hello-world');
  });

  test('handles single word', () => {
    const result = executeScript(scriptPath, 'hello');
    assertEqual(result.result, 'hello');
  });
});
