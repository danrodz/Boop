const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ASCIIToHex.js');

describe('ASCIIToHex', () => {
  test('converts ASCII to hex', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertEqual(result.result, '48656c6c6f');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('converts numbers and letters', () => {
    const result = executeScript(scriptPath, 'ABC123');
    assertEqual(result.result, '414243313233');
  });

  test('converts special characters', () => {
    const result = executeScript(scriptPath, '!@#');
    assertEqual(result.result, '214023');
  });
});
