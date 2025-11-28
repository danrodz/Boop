const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'HTMLDecode.js');

describe('HTMLDecode', () => {
  test('decodes HTML entities', () => {
    const result = executeScript(scriptPath, '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;');
    assertEqual(result.result, '<div>Hello & "World"</div>');
  });

  test('decodes ampersands', () => {
    const result = executeScript(scriptPath, 'A &amp; B &amp; C');
    assertEqual(result.result, 'A & B & C');
  });

  test('decodes quotes', () => {
    const result = executeScript(scriptPath, '&quot;quoted&quot; text');
    assertEqual(result.result, '"quoted" text');
  });

  test('decodes less than and greater than', () => {
    const result = executeScript(scriptPath, 'a &lt; b &gt; c');
    assertEqual(result.result, 'a < b > c');
  });

  test('decodes named entities', () => {
    const result = executeScript(scriptPath, '&copy; &nbsp; &reg;');
    assertEqual(result.result, '© \u00a0 ®');
  });
});
