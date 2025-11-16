const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JoinLinesWithSpace.js');

describe('JoinLinesWithSpace', () => {
  test('joins lines with spaces', () => {
    const result = executeScript(scriptPath, 'Hello\nWorld\nTest');
    assertEqual(result.result, 'Hello World Test');
  });
});
