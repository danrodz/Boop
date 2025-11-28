const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'HTMLEncode.js');

describe('HTMLEncode', () => {
  test('encodes HTML entities', () => {
    const result = executeScript(scriptPath, '<div>Hello & "World"</div>');
    assertEqual(result.result, '&lt;div&gt;Hello &amp; &quot;World&quot;&lt;/div&gt;');
  });

  test('encodes ampersands', () => {
    const result = executeScript(scriptPath, 'A & B & C');
    assertEqual(result.result, 'A &amp; B &amp; C');
  });

  test('encodes quotes', () => {
    const result = executeScript(scriptPath, '"quoted" text');
    assertEqual(result.result, '&quot;quoted&quot; text');
  });

  test('encodes less than and greater than', () => {
    const result = executeScript(scriptPath, 'a < b > c');
    assertEqual(result.result, 'a &lt; b &gt; c');
  });

  test('handles empty string', () => {
    const result = executeScript(scriptPath, '');
    assertEqual(result.result, '');
  });
});
