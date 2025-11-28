const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Deburr.js');

describe('Deburr', () => {
  test('removes accents from text', () => {
    const result = executeScript(scriptPath, 'café');
    assertEqual(result.result, 'cafe');
  });

  test('handles multiple accented characters', () => {
    const result = executeScript(scriptPath, 'naïve résumé');
    assertEqual(result.result, 'naive resume');
  });

  test('handles no accents', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'Hello World');
  });

  test('removes diacritics', () => {
    const result = executeScript(scriptPath, 'ñoño');
    assertEqual(result.result, 'nono');
  });
});
