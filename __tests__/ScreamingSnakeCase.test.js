const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ScreamingSnakeCase.js');

describe('ScreamingSnakeCase', () => {
  test('converts camelCase to SCREAMING_SNAKE_CASE', () => {
    const result = executeScript(scriptPath, 'helloWorldTest');
    assertEqual(result.result, 'HELLO_WORLD_TEST');
  });

  test('converts kebab-case to SCREAMING_SNAKE_CASE', () => {
    const result = executeScript(scriptPath, 'hello-world-test');
    assertEqual(result.result, 'HELLO_WORLD_TEST');
  });

  test('converts space-separated to SCREAMING_SNAKE_CASE', () => {
    const result = executeScript(scriptPath, 'hello world test');
    assertEqual(result.result, 'HELLO_WORLD_TEST');
  });

  test('handles already SCREAMING_SNAKE_CASE', () => {
    const result = executeScript(scriptPath, 'HELLO_WORLD');
    assertEqual(result.result, 'HELLO_WORLD');
  });
});
