const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'LoremIpsum.js');

describe('LoremIpsum', () => {
  test('generates Lorem Ipsum text', () => {
    const result = executeScript(scriptPath, '');
    assertContains(result.result.toLowerCase(), 'lorem');
  });

  test('generates substantial text', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result.length > 100, true);
  });

  test('contains Latin words', () => {
    const result = executeScript(scriptPath, '');
    assertContains(result.result.toLowerCase(), 'ipsum');
  });
});
