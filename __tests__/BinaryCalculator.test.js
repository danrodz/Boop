const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'BinaryCalculator.js');

describe('BinaryCalculator', () => {
  test('performs binary calculation', () => {
    const result = executeScript(scriptPath, '1010');
    assertContains(result.result, '10');
  });

  test('handles zero', () => {
    const result = executeScript(scriptPath, '0');
    assertContains(result.result, '0');
  });

  test('shows binary representation', () => {
    const result = executeScript(scriptPath, '11111111');
    assertContains(result.result, '255');
  });
});
