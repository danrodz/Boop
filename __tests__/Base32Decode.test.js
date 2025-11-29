const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Base32Decode.js');

describe('Base32Decode', () => {
  test('decodes simple base32', () => {
    const result = executeScript(scriptPath, 'JBSWY3DP');
    assertEqual(result.result, 'Hello');
  });

  test('decodes empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });

  test('decodes base32 with padding', () => {
    const result = executeScript(scriptPath, 'KRSXG5BRGM======');
    assertEqual(result.result, 'Test123');
  });

  test('decodes base32 with special chars', () => {
    const result = executeScript(scriptPath, 'IEYEKIJCIUQ=====');
    assertEqual(result.result, 'A!B@C#');
  });
});
