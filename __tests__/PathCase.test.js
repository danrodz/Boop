const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'PathCase.js');

describe('PathCase', () => {
  test('converts camelCase to path/case', () => {
    const result = executeScript(scriptPath, 'helloWorldTest');
    assertEqual(result.result, 'hello/world/test');
  });

  test('converts kebab-case to path/case', () => {
    const result = executeScript(scriptPath, 'hello-world-test');
    assertEqual(result.result, 'hello/world/test');
  });

  test('converts snake_case to path/case', () => {
    const result = executeScript(scriptPath, 'hello_world_test');
    assertEqual(result.result, 'hello/world/test');
  });

  test('handles already path/case', () => {
    const result = executeScript(scriptPath, 'hello/world');
    assertEqual(result.result, 'hello/world');
  });
});
