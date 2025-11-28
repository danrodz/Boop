const path = require('path');
const { executeScript, assertEqual } = require('./test-utils');

const scriptsDir = path.join(__dirname, '../Boop/Boop/scripts');
const scriptPath = path.join(scriptsDir, 'EvalJavascript.js');

describe('EvalJavascript', () => {
  test('evaluates JavaScript expression', () => {
    const result = executeScript(scriptPath, '2 + 2');
    assertEqual(result.result, '4');
  });

  test('evaluates string concatenation', () => {
    const result = executeScript(scriptPath, '"Hello" + " " + "World"');
    assertEqual(result.result, 'Hello World');
  });

  test('evaluates math operations', () => {
    const result = executeScript(scriptPath, '10 * 5');
    assertEqual(result.result, '50');
  });

  test('handles boolean expressions', () => {
    const result = executeScript(scriptPath, '5 > 3');
    assertEqual(result.result, 'true');
  });
});
