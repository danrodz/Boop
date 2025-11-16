const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'ContrastingColor.js');

describe('ContrastingColor', () => {
  test('determines contrast for white', () => {
    const result = executeScript(scriptPath, '#FFFFFF');
    assertContains(result.result, '#000');
    assertContains(result.result, 'ratio');
  });

  test('handles short hex format', () => {
    const result = executeScript(scriptPath, '#FFF');
    assertContains(result.result, '#000');
  });
});
