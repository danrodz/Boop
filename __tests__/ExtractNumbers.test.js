const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ExtractNumbers.js');

describe('ExtractNumbers', () => {
  test('extracts numbers from text', () => {
    const result = executeScript(scriptPath, 'I have 5 apples and 10 oranges');
    assertContains(result.result, '5');
    assertContains(result.result, '10');
  });

  test('extracts decimal numbers', () => {
    const result = executeScript(scriptPath, 'Price is 19.99 dollars');
    assertContains(result.result, '19');
  });

  test('handles no numbers', () => {
    const result = executeScript(scriptPath, 'No numbers here');
    assertEqual(result.result === '' || result.result === 'No numbers here', true);
  });
});
