const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'EscapeXML.js');

describe('EscapeXML', () => {
  test('escapes XML entities', () => {
    const result = executeScript(scriptPath, '<tag>value</tag>');
    assertEqual(result.result, '&lt;tag&gt;value&lt;/tag&gt;');
  });

  test('escapes ampersands', () => {
    const result = executeScript(scriptPath, 'A & B');
    assertEqual(result.result, 'A &amp; B');
  });

  test('escapes quotes', () => {
    const result = executeScript(scriptPath, '"quoted"');
    assertEqual(result.result, '&quot;quoted&quot;');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });
});
