const path = require('path');
const { executeScript, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'Wadsworth.js');

describe('Wadsworth', () => {
  test('removes first 30% of words', () => {
    const result = executeScript(scriptPath, 'one two three four five six seven eight nine ten');
    assertTrue(!result.result.includes('one'));
    assertTrue(result.result.includes('ten'));
  });
});
