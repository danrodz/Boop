const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ToggleCamelHyphen.js');

describe('ToggleCamelHyphen', () => {
  test('converts hyphen to camel', () => {
    const result = executeScript(scriptPath, 'some-hyphenated-text');
    assertEqual(result.result, 'someHyphenatedText');
  });

  test('converts camel to hyphen', () => {
    const result = executeScript(scriptPath, 'someHyphenatedText');
    assertEqual(result.result, 'some-hyphenated-text');
  });
});
