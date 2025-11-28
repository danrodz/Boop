const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'HTMLEncodeAll.js');

describe('HTMLEncodeAll', () => {
  test('encodes all HTML entities', () => {
    const result = executeScript(scriptPath, '<div>Hello & "World"</div>');
    assertContains(result.result, '&lt;');
    assertContains(result.result, '&gt;');
  });

  test('encodes all special characters', () => {
    const result = executeScript(scriptPath, '<>&"\'');
    assertContains(result.result, '&lt;');
    assertContains(result.result, '&gt;');
    assertContains(result.result, '&amp;');
  });

  test('handles plain text', () => {
    const result = executeScript(scriptPath, 'Hello World');
    assertEqual(result.result, 'Hello World');
  });
});
