const path = require('path');
const { executeScript, assertContains } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'CountWords.js');

describe('CountWords', () => {
  test('counts words in sentence', () => {
    const result = executeScript(scriptPath, 'Hello world this is a test');
    assertContains(result.result, '6');
  });

  test('counts single word', () => {
    const result = executeScript(scriptPath, 'Hello');
    assertContains(result.result, '1');
  });

  test('handles multiple spaces', () => {
    const result = executeScript(scriptPath, 'Hello    world');
    assertContains(result.result, '2');
  });

  test('counts words across lines', () => {
    const result = executeScript(scriptPath, 'Hello world\nFoo bar');
    assertContains(result.result, '4');
  });
});
