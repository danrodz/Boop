const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Base32Encode.js');

describe('Base32Encode', () => {
  test('encodes simple text', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertEqual(result.result, 'JBSWY3DP');
  });

  test('encodes empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('encodes text with numbers', () => {
    const result = executeScript(scriptPath, 'Test123');
    assertEqual(result.result, 'KRSXG5BRGM======');
  });

  test('encodes special characters', () => {
    const result = executeScript(scriptPath, 'A!B@C#');
    assertEqual(result.result, 'IEYEKIJCIUQ=====');
  });
});
