const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MorseEncode.js');

describe('MorseEncode', () => {
  test('encodes text to morse code', () => {
    const result = executeScript(scriptPath, 'SOS');
    assertContains(result.result, '...');
    assertContains(result.result, '---');
  });

  test('encodes single letter', () => {
    const result = executeScript(scriptPath, 'A');
    assertContains(result.result, '.-');
  });

  test('handles lowercase', () => {
    const result = executeScript(scriptPath, 'hi');
    assertContains(result.result, '....');
  });
});
