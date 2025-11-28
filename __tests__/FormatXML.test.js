const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'FormatXML.js');

describe('FormatXML', () => {
  test('formats minified XML', () => {
    const input = '<root><item>Test</item></root>';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '<root>');
    assertContains(result.result, '<item>');
  });

  test('formats nested XML', () => {
    const input = '<root><parent><child>Value</child></parent></root>';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '<parent>');
    assertContains(result.result, '<child>');
  });

  test('preserves XML attributes', () => {
    const input = '<root attr="value"><item id="1">Test</item></root>';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'attr="value"');
    assertContains(result.result, 'id="1"');
  });
});
