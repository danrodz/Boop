const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'PascalCase.js');

describe('PascalCase', () => {
  test('converts snake_case to PascalCase', () => {
    const result = executeScript(scriptPath, 'hello_world_test');
    assertEqual(result.result, 'HelloWorldTest');
  });

  test('converts kebab-case to PascalCase', () => {
    const result = executeScript(scriptPath, 'hello-world-test');
    assertEqual(result.result, 'HelloWorldTest');
  });

  test('converts camelCase to PascalCase', () => {
    const result = executeScript(scriptPath, 'helloWorldTest');
    assertEqual(result.result, 'HelloWorldTest');
  });

  test('converts space-separated words to PascalCase', () => {
    const result = executeScript(scriptPath, 'hello world test');
    assertEqual(result.result, 'HelloWorldTest');
  });

  test('handles already PascalCase text', () => {
    const result = executeScript(scriptPath, 'HelloWorldTest');
    assertEqual(result.result, 'HelloWorldTest');
  });

  test('handles single word', () => {
    const result = executeScript(scriptPath, 'hello');
    assertEqual(result.result, 'Hello');
  });
});
