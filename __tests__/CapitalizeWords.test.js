const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CapitalizeWords.js');

describe('CapitalizeWords', () => {
  test('capitalizes first letter of each word', () => {
    const result = executeScript(scriptPath, 'hello world test');
    assertEqual(result.result, 'Hello World Test');
  });

  test('handles already capitalized', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'Hello World');
  });

  test('handles all uppercase', () => {
    const result = executeScript(scriptPath, 'HELLO WORLD');
    assertEqual(result.result, 'HELLO WORLD');
  });

  test('capitalizes words separated by tabs', () => {
    const result = executeScript(scriptPath, 'hello\tworld\ttest');
    assertEqual(result.result, 'Hello\tWorld\tTest');
  });
});
