const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CreateSequence.js');

describe('CreateSequence', () => {
  test('creates number sequence', () => {
    const result = executeScript(scriptPath, '1-5');
    assertContains(result.result, '1');
    assertContains(result.result, '2');
    assertContains(result.result, '5');
  });

  test('handles single digit range', () => {
    const result = executeScript(scriptPath, '1-3');
    assertContains(result.result, '1');
    assertContains(result.result, '2');
    assertContains(result.result, '3');
  });
});
