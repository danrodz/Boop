const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MinifySQL.js');

describe('MinifySQL', () => {
  test('minifies formatted SQL', () => {
    const input = 'SELECT *\nFROM users\nWHERE age > 18';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'SELECT * FROM users WHERE age > 18');
  });

  test('removes extra whitespace', () => {
    const input = 'SELECT    *    FROM    users';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'SELECT * FROM users');
  });

  test('handles already minified SQL', () => {
    const input = 'SELECT * FROM users';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'SELECT * FROM users');
  });
});
