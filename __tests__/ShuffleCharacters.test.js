const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ShuffleCharacters.js');

describe('ShuffleCharacters', () => {
  test('shuffles all characters', () => {
    const result = executeScript(scriptPath, 'ABC');
    assertEqual(result.result.length, 3);
    assertTrue(result.result.includes('A'));
    assertTrue(result.result.includes('B'));
    assertTrue(result.result.includes('C'));
  });
});
