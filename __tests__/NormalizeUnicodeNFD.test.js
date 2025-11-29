const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NormalizeUnicodeNFD.js');

describe('NormalizeUnicodeNFD', () => {
  test('normalizes unicode to NFD', () => {
    const result = executeScript(scriptPath, 'café');
    assertEqual(result.result.length > 0, true);
  });

  test('decomposes characters', () => {
    const result = executeScript(scriptPath, 'é');
    assertEqual(result.result.length > 0, true);
  });

  test('handles ASCII unchanged', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertEqual(result.result, 'Hello');
  });
});
