const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CountCharacters.js');

describe('CountCharacters', () => {
  test('counts characters in text', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertContains(result.result, '5');
  });

  test('counts characters with spaces', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertContains(result.result, '11');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertContains(result.result, '0');
  });

  test('counts special characters', () => {
    const result = executeScript(scriptPath, '!@#$%');
    assertContains(result.result, '5');
  });
});
