const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Downcase.js');

describe('Downcase', () => {
  test('converts uppercase to lowercase', () => {
    const result = executeScript(scriptPath, 'HELLO WORLD');
    assertEqual(result.result, 'hello world');
  });

  test('handles already lowercase', () => {
    const result = executeScript(scriptPath, 'hello world');
    assertEqual(result.result, 'hello world');
  });

  test('converts mixed case', () => {
    const result = executeScript(scriptPath, 'HeLLo WoRLd');
    assertEqual(result.result, 'hello world');
  });

  test('handles numbers and special chars', () => {
    const result = executeScript(scriptPath, 'TEST123!@#');
    assertEqual(result.result, 'test123!@#');
  });
});
