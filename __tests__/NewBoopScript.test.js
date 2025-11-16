const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'NewBoopScript.js');

describe('NewBoopScript', () => {
  test('generates script template', () => {
    const result = executeScript(scriptPath, '');
    assertContains(result.result, 'function main(state)');
    assertContains(result.result, '"api"');
  });
});
