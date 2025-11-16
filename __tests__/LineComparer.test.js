const path = require('path');
const { executeScript, assertEqual, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'LineComparer.js');

describe('LineComparer', () => {
  test('checks if all lines are equal', () => {
    const result = executeScript(scriptPath, 'same\nsame\nsame');
    assertEqual(result.infos.length, 1);
    assertContains(result.infos[0], 'equal');
  });

  test('detects different lines', () => {
    const result = executeScript(scriptPath, 'same\ndifferent\nsame');
    assertEqual(result.errors.length, 1);
    assertContains(result.errors[0], 'Line 2');
  });
});
