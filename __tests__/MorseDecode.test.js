const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MorseDecode.js');

describe('MorseDecode', () => {
  test('decodes morse code to text', () => {
    const result = executeScript(scriptPath, '... --- ...');
    assertContains(result.result.toUpperCase(), 'SOS');
  });

  test('decodes simple morse', () => {
    const result = executeScript(scriptPath, '.-');
    assertContains(result.result.toUpperCase(), 'A');
  });

  test('handles spaces', () => {
    const result = executeScript(scriptPath, '.... .. / - .... . .-. .');
    assertContains(result.result.toUpperCase(), 'HI');
  });
});
