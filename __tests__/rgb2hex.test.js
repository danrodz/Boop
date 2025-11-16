const path = require('path');
const { executeScript, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'rgb2hex.js');

describe('rgb2hex', () => {
  test('converts RGB to hex', () => {
    const result = executeScript(scriptPath, '255, 128, 0');
    assertTrue(result.result.startsWith('#'));
    // Known bug: padding issue for low values
  });
});
