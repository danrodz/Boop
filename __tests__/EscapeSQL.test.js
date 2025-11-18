const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'EscapeSQL.js');

describe('EscapeSQL', () => {
  test('escapes single quotes', () => {
    const result = executeScript(scriptPath, "O'Reilly");
    assertEqual(result.result, "O''Reilly");
  });

  test('handles SQL injection attempts', () => {
    const result = executeScript(scriptPath, "'; DROP TABLE users; --");
    assertEqual(result.result, "''''; DROP TABLE users; --");
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('handles normal text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'Hello World');
  });
});
