const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'GenerateHashtag.js');

describe('GenerateHashtag', () => {
  test('creates hashtag from text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, '#HelloWorld');
  });

  test('removes special characters', () => {
    const result = executeScript(scriptPath, 'Hello, World!');
    assertEqual(result.result, '#HelloWorld');
  });

  test('handles empty input gracefully', () => {
    const result = executeScript(scriptPath, '');
    assertTrue(result.errors.length > 0 || result.result === '#');
  });
});
