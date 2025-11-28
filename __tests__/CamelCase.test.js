const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CamelCase.js');

describe('CamelCase', () => {
  test('converts snake_case to camelCase', () => {
    const result = executeScript(scriptPath, 'hello_world_test');
    assertEqual(result.result, 'helloWorldTest');
  });

  test('converts kebab-case to camelCase', () => {
    const result = executeScript(scriptPath, 'hello-world-test');
    assertEqual(result.result, 'helloWorldTest');
  });

  test('converts space-separated to camelCase', () => {
    const result = executeScript(scriptPath, 'hello world test');
    assertEqual(result.result, 'helloWorldTest');
  });

  test('handles already camelCase', () => {
    const result = executeScript(scriptPath, 'helloWorld');
    assertEqual(result.result, 'helloWorld');
  });

  test('handles single word', () => {
    const result = executeScript(scriptPath, 'hello');
    assertEqual(result.result, 'hello');
  });
});
