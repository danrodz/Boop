const path = require('path');
const { executeScript, assertEqual, assertTrue } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const escapeScriptPath = path.join(scriptsDir, 'EscapeJava.js');
const unescapeScriptPath = path.join(scriptsDir, 'UnescapeJava.js');

describe('EscapeJava', () => {
  test('escapes double quotes', () => {
    const result = executeScript(escapeScriptPath, 'Hello "World"');
    assertEqual(result.result, 'Hello \\"World\\"');
  });

  test('escapes backslashes', () => {
    const result = executeScript(escapeScriptPath, 'C:\\Users\\Test');
    assertEqual(result.result, 'C:\\\\Users\\\\Test');
  });

  test('escapes newlines and tabs', () => {
    const result = executeScript(escapeScriptPath, 'Hello\nWorld\t!');
    assertEqual(result.result, 'Hello\\nWorld\\t!');
  });

  test('escapes single quotes', () => {
    const result = executeScript(escapeScriptPath, "It's working");
    assertEqual(result.result, "It\\'s working");
  });

  test('handles empty string', () => {
    const result = executeScript(escapeScriptPath, '');
    assertEqual(result.result, '');
  });
});

describe('UnescapeJava', () => {
  test('unescapes double quotes', () => {
    const result = executeScript(unescapeScriptPath, 'Hello \\"World\\"');
    assertEqual(result.result, 'Hello "World"');
  });

  test('unescapes backslashes', () => {
    const result = executeScript(unescapeScriptPath, 'C:\\\\Users\\\\Test');
    assertEqual(result.result, 'C:\\Users\\Test');
  });

  test('unescapes newlines and tabs', () => {
    const result = executeScript(unescapeScriptPath, 'Hello\\nWorld\\t!');
    assertEqual(result.result, 'Hello\nWorld\t!');
  });

  test('unescapes single quotes', () => {
    const result = executeScript(unescapeScriptPath, "It\\'s working");
    assertEqual(result.result, "It's working");
  });

  test('round-trip escape and unescape', () => {
    const original = 'Test "quotes" and \\backslashes\n\ttabs';
    const escaped = executeScript(escapeScriptPath, original);
    const unescaped = executeScript(unescapeScriptPath, escaped.result);
    assertEqual(unescaped.result, original);
  });
});
