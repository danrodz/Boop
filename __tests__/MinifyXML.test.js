const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'MinifyXML.js');

describe('MinifyXML', () => {
  test('minifies formatted XML', () => {
    const input = '<root>\n  <item>Test</item>\n</root>';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '<root><item>Test</item></root>');
  });

  test('minifies nested XML', () => {
    const input = '<root>\n  <parent>\n    <child>Value</child>\n  </parent>\n</root>';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, '<root><parent><child>Value</child></parent></root>');
  });

  test('preserves XML attributes', () => {
    const input = '<root attr="value">\n  <item>Test</item>\n</root>';
    const result = executeScript(scriptPath, input);
    assertContains(result.result, 'attr="value"');
  });
});
