const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'FormatSQL.js');

describe('FormatSQL', () => {
  test('formats minified SQL', () => {
    const input = 'SELECT * FROM users WHERE age > 18';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'SELECT');
    assertContains(result.result, 'FROM');
  });

  test('formats SQL with JOIN', () => {
    const input = 'SELECT u.name FROM users u JOIN orders o ON u.id = o.user_id';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'SELECT');
    assertContains(result.result, 'JOIN');
  });

  test('handles INSERT statements', () => {
    const input = "INSERT INTO users (name, age) VALUES ('John', 30)";
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'INSERT');
    assertContains(result.result, 'VALUES');
  });
});
