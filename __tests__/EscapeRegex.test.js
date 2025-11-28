const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'EscapeRegex.js');

describe('EscapeRegex', () => {
  test('escapes regex special characters', () => {
    const result = executeScript(scriptPath, '.*+?^${}()|[]\\');
    assertEqual(result.result, '\\.\\*\\+\\?\\^\\$\\{\\}\\(\\)\\|\\[\\]\\\\');
  });

  test('escapes dots', () => {
    const result = executeScript(scriptPath, 'example.com');
    assertEqual(result.result, 'example\\.com');
  });

  test('handles normal text', () => {
    const result = executeScript(scriptPath, 'hello world');
    assertEqual(result.result, 'hello world');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });
});
