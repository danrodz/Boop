const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JSONToTypeScript.js');

describe('JSONToTypeScript', () => {
  test('converts JSON to TypeScript interface', () => {
    const input = '{"name": "John", "age": 30}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'interface');
    assertContains(result.result, 'name');
  });

  test('infers string type', () => {
    const input = '{"text": "hello"}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'string');
  });

  test('infers number type', () => {
    const input = '{"count": 42}';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'number');
  });
});
