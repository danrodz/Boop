const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Upcase.js');

describe('Upcase', () => {
  test('converts lowercase to uppercase', () => {
    const result = executeScript(scriptPath, 'hello world');
    assertEqual(result.result, 'HELLO WORLD');
  });

  test('handles already uppercase', () => {
    const result = executeScript(scriptPath, 'HELLO WORLD');
    assertEqual(result.result, 'HELLO WORLD');
  });

  test('converts mixed case', () => {
    const result = executeScript(scriptPath, 'HeLLo WoRLd');
    assertEqual(result.result, 'HELLO WORLD');
  });

  test('handles numbers and special chars', () => {
    const result = executeScript(scriptPath, 'test123!@#');
    assertEqual(result.result, 'TEST123!@#');
  });
});
