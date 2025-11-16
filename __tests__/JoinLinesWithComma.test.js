const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'JoinLinesWithComma.js');

describe('JoinLinesWithComma', () => {
  test('joins lines with commas', () => {
    const result = executeScript(scriptPath, 'Apple\nBanana\nCherry');
    assertEqual(result.result, 'Apple,Banana,Cherry');
  });
});
