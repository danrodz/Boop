const path = require('path');
const { executeScript, assertEqual, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'SmartQuotesToStraight.js');

describe('SmartQuotesToStraight', () => {
  test('converts smart double quotes', () => {
    const result = executeScript(scriptPath, '\u201CHello World\u201D');
    assertEqual(result.result, '"Hello World"');
    assertContains(result.infos[0], 'Converted');
  });

  test('converts smart single quotes', () => {
    const result = executeScript(scriptPath, '\u2018Hello World\u2019');
    assertEqual(result.result, "'Hello World'");
    assertContains(result.infos[0], 'Converted');
  });

  test('converts mixed quotes', () => {
    const result = executeScript(scriptPath, '\u201CHe said \u2018hello\u2019\u201D');
    assertEqual(result.result, '"He said \'hello\'"');
  });

  test('handles text without smart quotes', () => {
    const result = executeScript(scriptPath, 'No smart quotes here');
    assertEqual(result.result, 'No smart quotes here');
    assertContains(result.infos[0], 'No smart quotes found');
  });

  test('handles multiple smart quotes', () => {
    const result = executeScript(scriptPath, '\u201CFirst\u201D and \u201CSecond\u201D');
    assertEqual(result.result, '"First" and "Second"');
  });
});
